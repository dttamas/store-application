import React, { useEffect, useState } from "react";
import { fetchProducts, Product } from '../services/apiService';
import { useCart } from "../context/cart-context";
import InfiniteScroll from "react-infinite-scroll-component";
import Container from "../components/Container";
import Button from "../components/Button";
import Label from "../components/Label";

function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const { addItem } = useCart();
    const itemsPerScroll = 10;

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchProducts();
                setProducts(response);
                setDisplayProducts(response.slice(0, itemsPerScroll));
                setHasMore(response.length > itemsPerScroll);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        getProducts()
            .catch(error => console.error('Failed to fetch products:', error));
    }, []);

    function loadMore() {
        console.log('Loading more items');
        const currentLength = displayProducts.length;
        const nextLength = currentLength + itemsPerScroll;
        const isMore = currentLength < products.length;
        const nextResults = isMore ? products.slice(currentLength, nextLength) : [];
        console.log('Current length:', currentLength, 'Next length:', nextLength, 'Is there more:', isMore, 'Next results length:', nextResults.length, 'all products:', products.length);

        if (nextResults.length) {
            setDisplayProducts(prevDisplayProducts => [...prevDisplayProducts, ...nextResults]);
        }
        setHasMore(isMore);
    }

    if (!products.length) {
        return <Label text="Loading..." />;
    }

    function handleAddProduct(product: Product) {
        console.log('Adding product', product.id);
        addItem(product, 1);
    }

    return (
        <Container headerText="Currently available products">
            <InfiniteScroll
                dataLength={displayProducts.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<h4 className="text-center w-full">Loading...</h4>}
            >
                {displayProducts.map(product => (
                    <div key={product.id}
                         className="p-4">
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <img src={product.thumbnail} alt={product.title}/>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                                <p className="text-gray-600 mb-4">Price: ${product.price.toFixed(2)}</p>
                                <Button onClick={() => handleAddProduct(product)} text="Add to cart"/>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </Container>

    );
}

export default Products;

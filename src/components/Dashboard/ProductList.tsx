"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { productAPI, userAPI } from "@/utils/api";
import { Heart, PackageX } from "lucide-react";
import toast from "react-hot-toast";

interface Product {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  price: number;
  seller: {
    fullName: string;
  };
}

interface ProductListProps {
  limit?: number;
  products?: Product[];
}

const ProductCard = ({
  product,
  wishlist,
  setWishlist,
}: {
  product: Product;
  wishlist: string[];
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [loading, setLoading] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const toggleWishlist = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (isWishlisted) {
        await userAPI.removeWishlist(product.id);
        setWishlist((prev) => prev.filter((id) => id !== product.id));
        toast.success("Removed from wishlist");
      } else {
        await userAPI.addWishlist(product.id);
        setWishlist((prev) => [...prev, product.id]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update wishlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[47%] sm:w-[48%] md:w-[23%] xl:w-[24%] bg-white rounded-lg border border-gray-400 p-2 shadow hover:shadow-md transition relative">
      <button
        type="button"
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 bg-white rounded-full m-1 md:m-2 p-1 shadow hover:text-red-500"
      >
        {<Heart
          size={18}
          fill={isWishlisted ? "red" : "none"}
          color={isWishlisted ? "red" : "gray"}
        />}
      </button>

      <div className="relative h-40 w-full rounded overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="mt-2">
        <h3 className="text-sm font-semibold line-clamp-1">{product.title}</h3>
        <p className="text-gray-700 text-[12px] sm:text-sm font-semibold">₦{product.price}</p>
        <p className="text-gray-400 text-xs">{product.category}</p>
        <p className="text-gray-500 text-xs italic">
          Seller: {product.seller?.fullName || "N/A"}
        </p>
        <Link href={`/dashboard/product/${product.id}`}>
          <button className="mt-2 text-[#34C759] text-xs hover:underline">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="w-[45%] sm:w-[48%] md:w-[23%] xl:w-[24%] bg-gray-100 rounded-lg border border-gray-400 p-2 animate-pulse">
    <div className="h-40 w-full bg-gray-300 rounded"></div>
    <div className="mt-2 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="w-full flex flex-col items-center justify-center py-10 text-gray-500">
    <PackageX size={48} className="mb-2" />
    <p className="text-sm">No products found.</p>
  </div>
);

const ProductList: React.FC<ProductListProps> = ({ limit = 0, products: propProducts }) => {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [loading, setLoading] = useState(!propProducts);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, wishlistRes] = await Promise.all([
          propProducts ? Promise.resolve({ data: propProducts }) : productAPI.getAll(),
          userAPI.getWishlist(),
        ]);

        setFetchedProducts(productsRes.data);
        setWishlist(
          wishlistRes.data.map((item: { productId: string }) => item.productId)
        );
        console.log(productsRes.data);
        
      } catch (err) {
        console.error("Failed to fetch products or wishlist", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propProducts]);

  if (loading)
    return (
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center">
        Failed to load products. Please try again.
      </p>
    );

  const displayedProducts = limit
    ? (propProducts || fetchedProducts).slice(0, limit)
    : (propProducts || fetchedProducts);

  if (!displayedProducts.length) return <EmptyState />;

  return (
    <div className="flex flex-wrap gap-4">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      ))}
    </div>
  );
};

export default ProductList;

import { AddToCartButton } from "@/registry/ruixenui/add-to-cart-button";

export default function AddToCartButtonDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center">
      <AddToCartButton price={24.99} currency="$" />
    </div>
  );
}

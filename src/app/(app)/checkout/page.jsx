"use client";

import { getProductById } from "@/app/lib/query";
import { useEffect, useState } from "react";
import CartSummary from "@/app/components/CartSummary";
import FancyInput from "@/app/components/FancyInput";
import PrivacyPolicy from "@/app/components/PrivacyPolicy";
import { listCartItems } from "@/app/lib/cart";

export default function ChecloutPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchCartItems = async () => {
      try {
        const cartItems = await listCartItems(signal); // Fetch cart items
        const fullCartItems = await Promise.all(
          cartItems.map(async (item) => {
            const product = await getProductById(item.id);
            return { ...product, ...item };
          }),
        );
        setCart(fullCartItems || []); // Ensure fullCartItems is an array
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();

    return () => abortController.abort();
  }, []);

  const calculateTotal = () => {
    return cart
      ? cart.reduce((total, prod) => total + prod.price * prod.quantity, 0)
      : 0;
  };

  return (
    <section className="gap-16 p-8 pr-12 md:flex">
      <Checkout />
      <section className="hidden flex-1 md:block">
        <CartSummary subtotal={calculateTotal()} />
      </section>
    </section>
  );
}

function Checkout() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pix"); // credit-***, debit-***, pix

  return (
    <section className="flex-[2] pr-4 lg:px-24">
      <h1 className="mb-8 text-2xl font-semibold">Finalização</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(Object.fromEntries(new FormData(e.target)));
        }}
      >
        <h2 className="mb-4 text-xl">Endereço de entrega</h2>
        <section className="grid gap-4 md:grid-cols-2">
          <FancyInput name="username" label="Nome" required />
          <FancyInput name="surname" label="Sobrenome" required />
          <FancyInput name="addr" label="Endereço" required />
          <FancyInput name="cep" label="CEP" required />
          <FancyInput name="city" label="Cidade" />
          <FancyInput name="state" label="Estado" />
          <FancyInput name="email" label="E-mail" htmlAccept="email" required />
          <FancyInput name="tel" label="Telefone" />
        </section>

        <hr className="my-6" />

        <h2 className="mb-4 text-xl">Entrega</h2>
        <ul className="radio-list">
          <FancyRadio
            label="Correios (5-7 dias úteis)"
            name="shipping"
            value="correios"
          />
          <FancyRadio
            label="Fedex (2-3 dias úteis)"
            name="shipping"
            value="fedex"
          />
          <FancyRadio
            label="Jadlog (2-3 dias úteis)"
            name="shipping"
            value="jadlog"
          />
          <FancyRadio
            label="Loggi (2-3 dias úteis)"
            name="shipping"
            value="loggi"
          />
        </ul>

        <hr className="my-6" />

        <h2 className="mb-4 text-xl">Pagamento</h2>
        <ul className="radio-list">
          <FancyRadio
            label="Cartão de débito"
            name="payment_method"
            value="debit"
            checked={paymentMethod == "debit"}
            onChecked={() => setPaymentMethod("debit")}
          />
          <FancyRadio
            label="Cartão de crédito"
            name="payment_method"
            value="credit"
            checked={paymentMethod == "credit"}
            onChecked={() => setPaymentMethod("credit")}
          />
          <FancyRadio
            label="PIX"
            name="payment_method"
            value="pix"
            checked={paymentMethod == "pix"}
            onChecked={() => setPaymentMethod("pix")}
          />
        </ul>

        {paymentMethod !== "pix" && (
          <>
            <h3 className="mt-5 text-lg">Operadora de cartão</h3>
            <div className="mt-4 w-full rounded-lg border border-stone-300 bg-transparent py-4 pl-10 pr-10 shadow-sm">
              <select
                name="payment_provider"
                id="sl-payment_provider"
                className="w-full bg-transparent *:font-sans"
              >
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
                <option value="americanexpress">American Express</option>
              </select>
            </div>
          </>
        )}

        <button className="action mt-4">Finalizar compra</button>

        <p className="mt-3 text-xs md:text-sm">
          Ao finalizar a compra você concorda com a nossa{" "}
          <button
            className="text-cyan-700"
            onClick={() => setPrivacyOpen(true)}
          >
            política de privacidade
          </button>
          .
        </p>
      </form>
      <PrivacyPolicy open={privacyOpen} setOpen={setPrivacyOpen} />
    </section>
  );
}

function FancyRadio({ label, name, value, checked = null, onChecked = null }) {
  return (
    <li className="has-[:checked]:border-cyan-600 has-[:checked]:bg-sky-100">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChecked}
        required
      />
      <label>{label}</label>
    </li>
  );
}

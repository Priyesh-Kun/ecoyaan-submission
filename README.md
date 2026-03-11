# Ecoyaan Checkout Flow

A multi-step checkout flow built for the Ecoyaan frontend assignment.

---

## Tech Stack

- **Next.js 14** (App Router) — SSR via Server Components
- **TypeScript** — typed props and shared interfaces
- **Tailwind CSS v4** — utility-first styling
- **React Context API** — cart and address state across steps
- **React Hook Form + Zod** — form validation
- **Lucide React** — icons

---

## Running Locally

```bash
git clone https://github.com/Priyesh-Kun/ecoyaan-submission.git
cd ecoyaan-submission
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Architecture Notes

- **SSR** — the cart page is a Server Component that fetches from `/api/cart` on every request
- **State** — `CartContext` holds cart items and shipping address across the 3-step flow; `subtotal` and `grandTotal` are derived in context
- **Forms** — Zod schema validates email format, 10-digit phone, and 6-digit PIN; errors show on blur
- **Routing** — payment page redirects to `/address` if no shipping address exists in context

## Flow

```
/ (Cart)  →  /address  →  /payment  →  /success
```

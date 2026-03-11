"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { ShippingAddress } from "@/types";

interface AddressModalProps {
  onClose: () => void;
  onSuccess: () => void;
  prefillEmail?: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  house?: string;
  street?: string;
  pincode?: string;
  city?: string;
  state?: string;
}
// Move this OUTSIDE the AddressModal component, at the module level
const Field = ({
  label,
  field,
  placeholder,
  optional = false,
  form,
  errors,
  touched,
  onChange,
  onBlur,
}: {
  label: string;
  field: keyof ShippingAddress;
  placeholder: string;
  optional?: boolean;
  form: ShippingAddress;
  errors: FormErrors;
  touched: Record<string, boolean>;
  onChange: (field: keyof ShippingAddress, value: string) => void;
  onBlur: (field: keyof ShippingAddress) => void;
}) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}{" "}
      {optional && (
        <span className="text-gray-400 normal-case">(Optional)</span>
      )}
      {!optional && <span className="text-red-500"> *</span>}
    </label>
    <input
      type="text"
      value={form[field] as string}
      onChange={(e) => onChange(field, e.target.value)}
      onBlur={() => onBlur(field)}
      placeholder={placeholder}
      className={`mt-1 w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none transition-colors text-gray-700
        ${
          errors[field as keyof FormErrors] && touched[field]
            ? "border-red-400 focus:border-red-400"
            : "border-gray-300 focus:border-green-500"
        }`}
    />
    {errors[field as keyof FormErrors] && touched[field] && (
      <p className="text-xs text-red-500 mt-1">
        {errors[field as keyof FormErrors]}
      </p>
    )}
  </div>
);

export default function AddressModal({
  onClose,
  onSuccess,
  prefillEmail = "",
}: AddressModalProps) {
  const { setShippingAddress } = useCart();

  const [form, setForm] = useState<ShippingAddress>({
    fullName: "",
    mobile: "",
    email: prefillEmail,
    house: "",
    street: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (values: ShippingAddress): FormErrors => {
    const e: FormErrors = {};
    if (!values.fullName.trim()) e.fullName = "Full name is required";
    if (!values.mobile.trim()) e.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(values.mobile))
      e.mobile = "Enter a valid 10-digit number";
    if (!values.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Enter a valid email";
    if (!values.house.trim()) e.house = "House/Flat is required";
    if (!values.street.trim()) e.street = "Street/Area is required";
    if (!values.pincode.trim()) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(values.pincode))
      e.pincode = "Enter a valid 6-digit pincode";
    if (!values.city.trim()) e.city = "City is required";
    if (!values.state.trim()) e.state = "State is required";
    return e;
  };

  const handleChange = (field: keyof ShippingAddress, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) {
      const newErrors = validate(updated);
      setErrors((prev) => ({
        ...prev,
        [field]: newErrors[field as keyof FormErrors],
      }));
    }
  };

  const handleBlur = (field: keyof ShippingAddress) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({
      ...prev,
      [field]: newErrors[field as keyof FormErrors],
    }));
  };

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(
      Object.keys(form).map((k) => [k, true]),
    );
    setTouched(allTouched);
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShippingAddress(form);
      onSuccess();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-bold text-gray-800">Add Delivery Address</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <Field
            label="Full Name"
            field="fullName"
            placeholder="Priya Sharma"
            form={form}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Mobile Number"
              field="mobile"
              placeholder="9876543210"
              form={form}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Email"
              field="email"
              placeholder="priya@example.com"
              form={form}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <Field
            label="House / Flat / Building"
            field="house"
            placeholder="Flat 4B, Green Apartments"
            form={form}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Field
            label="Street / Area / Locality"
            field="street"
            placeholder="MG Road, Koramangala"
            form={form}
            errors={errors}
            touched={touched}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Landmark"
              field="landmark"
              placeholder="Near City Mall"
              optional
              form={form}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="Pincode"
              field="pincode"
              placeholder="560001"
              form={form}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field
              label="City / Town"
              field="city"
              placeholder="Bangalore"
              form={form}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Field
              label="State"
              field="state"
              placeholder="Karnataka"
              form={form}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-green-700" />
            Make this Address Default
          </label>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-700 text-white font-semibold py-3 rounded-xl text-sm hover:bg-green-800 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

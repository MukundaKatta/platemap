"use client";

import { useState, useRef } from "react";
import Link from "next/link";

interface MenuItem {
  name: string;
  price: string;
  calories: number;
  protein: string;
  allergens: string;
}

const MOCK_RESULTS: MenuItem[] = [
  {
    name: "Margherita Pizza",
    price: "$14",
    calories: 820,
    protein: "34g",
    allergens: "gluten, dairy",
  },
  {
    name: "Caesar Salad",
    price: "$12",
    calories: 480,
    protein: "18g",
    allergens: "gluten, dairy, fish",
  },
  {
    name: "Tiramisu",
    price: "$9",
    calories: 390,
    protein: "6g",
    allergens: "dairy, egg, caffeine",
  },
];

export default function TryPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<MenuItem[] | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setResults(null);

    // Simulate processing delay, then show mocked results
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setResults(MOCK_RESULTS);
    }, 1500);
  }

  function handleReset() {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setResults(null);
    setProcessing(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
          Platemap
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
            Menu scanner
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Upload a menu photo, get nutrition instantly.
          </h1>
        </div>

        {!imageUrl ? (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-12 transition hover:border-orange-400 hover:bg-orange-50">
            <div className="text-4xl">📷</div>
            <p className="mt-4 text-sm font-medium text-neutral-700">
              Click to upload a handwritten menu photo
            </p>
            <p className="mt-1 text-xs text-neutral-400">JPG, PNG, or HEIC</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </label>
        ) : (
          <div className="space-y-6">
            {/* Uploaded image preview */}
            <div className="overflow-hidden rounded-3xl border border-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Uploaded menu"
                className="w-full object-cover"
              />
            </div>

            {/* Processing state */}
            {processing && (
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                <p className="mt-3 text-sm text-neutral-600">
                  Scanning menu and estimating nutrition...
                </p>
              </div>
            )}

            {/* Mocked results */}
            {results && (
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                  Digitized menu — 3 items detected
                </div>
                <div className="mt-4 space-y-4">
                  {results.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl border border-neutral-100 bg-neutral-50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-neutral-900">{item.name}</span>
                        <span className="text-sm font-medium text-neutral-700">{item.price}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-3 text-xs text-neutral-500">
                        <span>{item.calories} cal</span>
                        <span>{item.protein} protein</span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        Contains: {item.allergens}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                >
                  Scan another menu
                </button>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          This is a v0 preview with mocked nutrition data. No real OCR yet.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the full experience.
        </p>
      </div>
    </div>
  );
}

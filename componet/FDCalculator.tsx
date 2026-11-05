"use client";

import { useState } from "react";

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState(4);

  const maturity =
    principal * Math.pow(1 + rate / (100 * frequency), frequency * years);

  const interest = maturity - principal;

  const format = (value: number) =>
    value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const yearlyData = Array.from({ length: years }, (_, i) => {
    const year = i + 1;
    return {
      year,
      amount:
        principal *
        Math.pow(1 + rate / (100 * frequency), frequency * year),
    };
  });

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          FD Calculator
        </h1>
        <p className="mb-8 text-slate-500">
          Estimate how much your fixed deposit will grow over time.
        </p>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Investment Details
            </h2>

            <div className="mb-8">
              <div className="mb-3 flex justify-between">
                <label>Deposit Amount (₹)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) =>
                    setPrincipal(Math.max(0, Number(e.target.value)))
                  }
                  className="w-32 rounded-lg border p-2 text-right"
                />
              </div>
              <input
                type="range"
                min="10000"
                max="5000000"
                step="10000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>₹10,000</span>
                <span>₹50,00,000</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-3 flex justify-between">
                <label>Rate of Return (%)</label>
                <span className="font-semibold">{rate}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="0.25"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>1%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-3 flex justify-between">
                <label>Time Period (Years)</label>
                <span className="font-semibold">{years} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-sm text-slate-400">
                <span>1 Year</span>
                <span>10 Years</span>
              </div>
            </div>

            <div>
              <label className="mb-3 block">Interest Compounding</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-full rounded-lg border p-3"
              >
                <option value={1}>Yearly</option>
                <option value={2}>Half-yearly</option>
                <option value={4}>Quarterly</option>
                <option value={12}>Monthly</option>
              </select>
            </div>
          </section>

          {/* Results section */}
          <section className="rounded-2xl bg-indigo-950 p-6 text-white shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-indigo-200">Maturity Amount</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {format(maturity)}
                </h2>
              </div>
              <div>
                <p className="text-sm text-indigo-200">Interest Earned</p>
                <h2 className="mt-2 text-3xl font-bold">
                  {format(interest)}
                </h2>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-white p-5 text-slate-800">
              <h3 className="mb-6 font-semibold">Year-wise Growth</h3>

              <div className="flex h-52 items-end justify-around gap-3">
                {yearlyData.map((item) => (
                  <div
                    key={item.year}
                    className="flex h-full flex-1 flex-col items-center justify-end"
                  >
                    <div className="mb-2 text-xs text-slate-500">
                      {format(item.amount)}
                    </div>
                    <div
                      className="w-full rounded-t-md bg-indigo-400"
                      style={{
                        height: `${(item.amount / maturity) * 75}%`,
                      }}
                    />
                    <span className="mt-2 text-xs">
                      Year {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-indigo-800 p-5">
                <h3 className="font-semibold">
                  Explore Investment Products
                </h3>
                <p className="mt-2 text-sm text-indigo-200">
                  Find suitable investment options for your goals.
                </p>
              </div>
              <div className="rounded-xl bg-indigo-800 p-5">
                <h3 className="font-semibold">
                  Need Help Finding the Right Product?
                </h3>
                <p className="mt-2 text-sm text-indigo-200">
                  Get guidance from a wealth manager.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
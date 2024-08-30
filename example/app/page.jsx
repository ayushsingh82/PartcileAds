"use client";
import Image from "next/image";
import { DisplayAd } from "adbase-package";
export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold text-gray-800">Blockchain Blog</h1>
        </header>

        <div className="flex">
          <main className="w-2/3 p-4">
            <article className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Understanding Blockchain Technology
              </h2>
              <p className="text-gray-700 mb-4">By Author on June 30, 2024</p>
              <p className="text-gray-800 leading-relaxed">
                Blockchain technology is a decentralized ledger that records
                transactions across many computers, ensuring that the record
                cannot be altered retroactively. This innovation ensures
                transparency and security in digital transactions.
              </p>
            </article>

            <article className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Smart Contracts: Revolutionizing Agreements
              </h2>
              <p className="text-gray-700 mb-4">By Author on June 28, 2024</p>
              <p className="text-gray-800 leading-relaxed">
                Smart contracts are self-executing contracts with the terms of
                the agreement directly written into code. They facilitate,
                verify, and enforce the negotiation or performance of a
                contract, making transactions traceable and irreversible.
              </p>
            </article>

            <article className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Decentralized Finance (DeFi): A New Financial System
              </h2>
              <p className="text-gray-700 mb-4">By Author on June 25, 2024</p>
              <p className="text-gray-800 leading-relaxed">
                Decentralized Finance, or DeFi, refers to financial services
                using smart contracts on a blockchain. This technology enables
                users to borrow, lend, trade, and earn interest without relying
                on traditional financial institutions.
              </p>
            </article>

            <article className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                Cryptocurrencies: The Future of Money?
              </h2>
              <p className="text-gray-700 mb-4">By Author on June 20, 2024</p>
              <p className="text-gray-800 leading-relaxed">
                Cryptocurrencies are digital or virtual currencies that use
                cryptography for security. The most popular cryptocurrency,
                Bitcoin, has sparked interest in a new form of money that
                operates outside of government control.
              </p>
            </article>
          </main>

          <aside className="w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Advertisement</h3>
              <div className="bg-gray-200 h-auto flex items-center justify-center">
                <span className="grid grid-col-1 text-gray-600">
                  <DisplayAd width={800} height={800}/>
                  <DisplayAd width={800} height={800}/>
                  <DisplayAd width={800} height={800}/>
                  <DisplayAd width={800} height={800}/>
                  <DisplayAd width={800} height={800}/>
                </span>
              </div>
            </div>
          </aside>
        </div>

        <footer className="text-center py-4">
          <p className="text-gray-600">
            © 2024 Blockchain Blog. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

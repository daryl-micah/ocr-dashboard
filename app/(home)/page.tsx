import { Container, Main, Section } from "@/components/craft";
import Hero from "@/components/core/hero";
import Feature from "@/components/core/features";
import Footer from "@/components/core/footer";
import CTA from "@/components/core/cta";

import Link from "next/link";

export default function Home() {
  return (
    <Main>
      <Container>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-center">
                OCR JSON Editor
              </h1>
              <p className="mt-2 text-center text-gray-600">
                Edit and manage your JSON data
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <Link
                href="https://ideal-honeybee-68.accounts.dev/sign-in"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                href="https://ideal-honeybee-68.accounts.dev/sign-up"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Main>
  );
}

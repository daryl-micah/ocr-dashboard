import { Main, Section } from "@/components/craft";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // add login check here to authenticate

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">OCR Dashboard</h1>
            </div>
            <div className="flex items-center">
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignUpButton />
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      <Main>
        <Section>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow-sm rounded-lg p-6">
              // Add image/JSON list and filtering
            </div>
          </main>
        </Section>
      </Main>
    </div>
  );
}

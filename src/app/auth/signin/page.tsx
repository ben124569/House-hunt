import { type Metadata } from "next";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { SignInForm } from "~/components/auth/sign-in-form";
import { authOptions } from "~/server/auth";

export const metadata: Metadata = {
  title: "Sign In - House Hunt Platform",
  description: "Sign in to access the family property research platform",
};

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  
  // If user is already signed in, redirect to dashboard
  if (session) {
    redirect("/");
  }

  const providers = await getProviders();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">🏡</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            House Hunt Platform
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the family property research platform
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="rounded-lg bg-white shadow-lg p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Family Platform:</strong> This platform is designed for collaborative property research. 
                      Sign in with Google to access family property data and research tools.
                    </p>
                  </div>
                </div>
              </div>

              <SignInForm providers={providers} />
              
              <div className="text-center">
                <div className="text-xs text-gray-500 space-y-1">
                  <p><strong>New family members</strong> will be added with Viewer access.</p>
                  <p>Contact the family admin to upgrade your permissions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Built for the Adelaide property search • Northern suburbs focus
          </p>
        </div>
      </div>
    </div>
  );
}
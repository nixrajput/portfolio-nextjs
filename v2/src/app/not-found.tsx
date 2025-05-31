"use client";

import BackButton from "@/components/common/back-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [errorCode] = useState("404");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="not-found"
      className="relative h-auto min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 flex items-center w-full max-w-screen justify-center overflow-hidden p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-auto"
      >
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-xl">
          <CardHeader className="space-y-1 text-center pb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 mb-2"
            >
              {errorCode}
            </motion.div>
            <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
            <CardDescription className="text-neutral-500 dark:text-neutral-400">
              We couldn&apos;t find the page you were looking for.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-2 pb-2">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              The page may have been moved, deleted, or never existed in the
              first place.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <BackButton
              variant="default"
              label="Go Back"
              showIcon
              className="w-full bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 hover:opacity-90 transition-opacity text-white"
            />
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

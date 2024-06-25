"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea"
import { cn } from "@/lib/utils/cn";
import { FaLocationArrow } from "react-icons/fa6";
// import {
//  IconBrandGithub,
//  IconBrandGoogle,
//  IconBrandOnlyfans,
// } from "@tabler/icons-react";

/** 
* UI: Contact Form
* Link : https://ui.aceternity.com/components/signup-form
**/
export function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <>
      <div id="contact" className="h-10 lg:h-20 mt-24"></div>
      <section
        // id="contact"
        className="w-11/12 mx-auto mt-10"
      >
        <div className="md:px-8 pb-20">
          <header className="mx-auto text-center">
            {/*
            <h3 className="w-full text-2xl font-bold tracking-tight text-foreground md:text-2xl lg:text-3xl"> // text-[40px]  lg:text-6xl
            
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Thanks
              </span>{" "}
              for taking the time to reach out.</h3>
              */}
            {/*
          <h4 className="my-5 text-md md:text-xl leading-8 text-foreground">
            How can I help you today ?
          </h4>
          */}
          </header>
          {/*Form*/}
          <div className="max-w-2xl w-full mx-auto rounded-xl md:rounded-2xl p-4 md:p-8 shadow-input bg-slate-900/[0.9] border border-slate-800 backdrop-blur-xl " >

            {/*Form Header*/}

            <h2 className="font-bold text-lg lg:text-xl text-neutral-800 dark:text-neutral-200">
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
  
              </span>{" "}
              Je suis impatient d’en apprendre davantage sur votre projet.
            </h2>

            <p className="text-neutral-600 text-md lg:text-lg max-w-sm mt-2 dark:text-neutral-300">
              Comment puis-je vous aider ?
              {/*} Login to aceternity if you can because we don&apos;t have a login flow
              yet */}
            </p>

            <form target="" action="https://formsubmit.co/7eda150ffd3bdfbb5cb58c14affa14d2" method="POST" className="my-8" >
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 gap-2">
                <LabelInputContainer>
                  <Label htmlFor="firstname" >Prénom</Label>
                  <Input id="firstname" placeholder="e.g. Fred" type="text" required />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="lastname">Nom</Label>
                  <Input id="lastname" placeholder="e.g. Livrézon" type="text" />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="e.g. niceToMeetYou@hello.com"
                  name="email"
                  type="email"
                  required
                />

              </LabelInputContainer>
              <div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="Subject">Objet</Label>
                  <Input id="Subject" placeholder="e.g. Let's Connect !" type="text" />
                </LabelInputContainer>
              </div>
              {/*
              <LabelInputContainer className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" />
              </LabelInputContainer>
      
              <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Your twitter password</Label>
              <Input
                id="twitterpassword"
                placeholder="••••••••"
                type="twitterpassword"
              />
              </LabelInputContainer>
              */ }
              <LabelInputContainer className="mb-4">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  //name="message"
                  id="message"
                  placeholder='...'
                  className="block w-full rounded-md border-0 px-3.5 py-2 h-20 outline-none focus:outline-none"
                  defaultValue={''}
                  required
                />
              </LabelInputContainer>

              <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-slate-900 dark:to-slate-900 to-neutral-600 block dark:bg-slate-800 w-full text-white rounded-md h-10 font-medium lg:text-lg shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--slate-800)_inset,0px_-1px_0px_0px_var(--slate-800)_inset]"
                type="submit"
              >
                Envoyer
                <FaLocationArrow className="h-4 w-4 text-neutral-800 dark:text-neutral-300 ml-2 inline bold" />
                <BottomGradient />
              </button>
              {/*
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

              <div className="flex flex-col space-y-4">
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    GitHub
                  </span>
                  <BottomGradient />
                </button>
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                  </span>
                  <BottomGradient />
                </button>
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    OnlyFans
                  </span>
                  <BottomGradient />
                </button>

              </div>
             */}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full outline-none focus:outline-none", className)}>
      {children}
    </div>
  );
};

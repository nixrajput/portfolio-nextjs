// import Image from "next/image";
// import { Balancer } from "react-wrap-balancer";
// import Column from "@/components/core/Column";
// import ConstraintedBox from "@/components/core/ConstraintedBox";
// import GridBox from "@/components/core/GridBox";
// import ResponsiveBox from "@/components/core/ResponsiveBox";
// import Row from "@/components/core/Row";

// const HomeSection2 = ({ id }: Readonly<{ id: string }>) => {
//   return (
//     <ResponsiveBox
//       classNames="dark:bg-[var(--dialogColor)] bg-[var(--dialogColor)] min-h-screen items-center justify-center dark:bg-dot-white/[0.2] bg-dot-white/[0.2] rounded-md"
//       id={id}
//     >
//       <ConstraintedBox classNames="px-4 py-8 pt-24 z-10">
//         <GridBox classNames="justify-items-stretch !gap-16 lg:!gap-8">
//           <Column classNames="justify-center max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
//             <Column classNames="max-w-full">
//               <p className="text-base/6 drop_in">Hi 👋 I&apos;m</p>

//               <p className="text-4xl/normal md:text-5xl/normal font-bold text-[var(--primaryColor)] drop_in">
//                 Nikhil Rajput
//               </p>

//               <p className="text-sm/6 font-medium text-[var(--textColorLight)] drop_in">
//                 Software Enginner & Full Stack Developer
//               </p>

//               <p className="text-base/normal mt-8 drop_in">
//                 <Balancer>
//                   Welcome to my portfolio! I am a goal-oriented and
//                   results-driven Full Stack Developer from India with 2+ years
//                   of experience in developing dynamic web applications and
//                   robust backend APIs. I am skilled in front-end and back-end
//                   development using modern technologies such as Node.js,
//                   React.js, Next.js, Express.js, Flutter, GetX and Redux
//                   Toolkit. I demonstrate a quick learning ability and a passion
//                   for keeping up with industry advancements. I am a strong
//                   problem-solver who excels in collaborative team settings.
//                 </Balancer>
//               </p>
//             </Column>
//           </Column>

//           <Row classNames="w-[20rem] h-[20rem] lg:w-[25rem] lg:h-[25rem] pointer-events-none justify-self-center sm:justify-self-end items-center justify-center rounded-full bg-transparent border-2 border-[var(--primaryColor60)] aspect-sqaure overflow-hidden my-auto drop_out">
//             <Row classNames="w-full h-auto items-center justify-center rounded-full bg-transparent border-[0.8rem] border-[var(--primaryColor30)] aspect-sqaure overflow-hidden pointer-events-none">
//               <Image
//                 src="/images/profile.webp"
//                 alt="profile"
//                 width={400}
//                 height={400}
//                 sizes="100%"
//                 priority
//                 placeholder="blur"
//                 blurDataURL="/images/placeholder.png"
//                 style={{
//                   objectFit: "cover",
//                   width: "100%",
//                   height: "100%",
//                   aspectRatio: "1 / 1",
//                 }}
//               />
//             </Row>
//           </Row>
//         </GridBox>
//       </ConstraintedBox>
//     </ResponsiveBox>
//   );
// };

// export default HomeSection2;

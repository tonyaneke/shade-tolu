"use client";

import { FC } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export const TributePage: FC = () => {
  return (
    <section className="min-h-screen py-24 px-6 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-tl from-amber-100 to-yellow-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-4"
            style={{ fontFamily: "var(--font-tangerine)" }}
          >
            In Loving Memory
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Content */}
        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Image Container - Left on large screens */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-5/12 mb-8 lg:mb-0 lg:sticky lg:top-32"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-200">
              <Image
                src="https://i.postimg.cc/YC87Nz7V/Gemini-Generated-Image-chqpiochqpiochqp-2.png"
                alt="Mother of the Bride"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Text Content - Right on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-7/12 space-y-8"
          >
            {/* Name and Details */}
            <div className="text-center lg:text-left">
              <h2
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-2"
                style={{ fontFamily: "var(--font-tangerine)" }}
              >
                Iya Yemi
              </h2>
              <p className="text-xl text-gray-600 italic">Beloved Mother</p>
            </div>

            {/* Tribute Text */}
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Mummy, I am about to take a significant step in my life, and I
                wish you were here to celebrate with me. As I stand here
                surrounded by family, friends, love and joy, my heart overflows
                with gratitude for the incredible woman you were. You were the
                epitome of discipline, humility, perseverance, service,
                dedication, honesty, boldness, strength and selflessness, always
                putting others before yourself.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Your tireless work ethic—both in business and in church—and your
                unwavering dedication to our family were a constant source of
                inspiration and strength. Your listening ear, soft words, and
                calm demeanor could soothe any worry or concern. Your strength
                and resilience held our family together, and I am grateful for
                the values and love you instilled in me and my siblings
                alongside Daddy (Baba Yemi).
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                Though you are no longer with us, your legacy lives on through
                me and my siblings, and we strive every day to make you proud.
                Quick update for you as I always did: Opeyemi is still stubborn,
                but I am dealing with him well. He is always in my business, so
                I continued from where you stopped... Lol! Your boy has evolved
                into a full-fledged caring, supportive, tenacious, and energetic
                responsible man. He never backs down and always says, "Thank God
                for Mummy and Daddy's training."
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                Akorede is indeed plentiful in good tidings—your boy didn't
                leave Agbala Itura o... your boy is now an ambidextrous Pastor
                and doing wonders, prospering on all sides at his God-ordained
                pace. Kenny sadly left us 3 years after you did... it was so
                hurtful, but before her exit, she was graciously beautiful and
                industrious. She had the key to Daddy's heart, which I now added
                to the earlier key I had. Lol...
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                Daddy is finally taking steps to start a new life after 12 years
                of your exit. Thank you for choosing him as our father. He
                outdid himself, Mum. Baba Yemi is now so soft, not the chief
                judge he used to be. He embodied the role of both a father and a
                mother all alone.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                For me, your Sha Sha... I am looking like you more and more by
                the day. At times, others look at me in amusement at how much I
                look like you, especially when I relax my hair like you do.
                Well, you see that look is earning me a lot from the boys you
                and Kenny left me with. Over the years, I have evolved into a
                moving force I honestly cannot explain in words. But I am sure
                you will be proud of me if you were alive.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
              >
                The mother, father, and siblings you handpicked and handed me
                over to can testify... they are super proud of me. Let's talk
                about the Anifiwoses... ooh! They are a blessing. Mummy & Daddy
                Anifowose groomed your little girl into a woman of substance on
                all sides—spiritually, emotionally, physiologically,
                financially, and socially.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 0.6 }}
              >
                Daddy Anifowose, in addition to Baba Yemi, set standards to
                guide my expectations from my ideal man. Mummy Anifowose
                (Saymama, mama-no-nonsense) instilled morals with love and what
                we jokingly call "violence promax" until morals, self-esteem,
                ambition, and purpose became a part of me. Jibola, Bisola,
                Damilola, and Eniola are amazing siblings money cannot buy. They
                are doing excellently well too.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
              >
                In the course of life, I found myself with a new set of parents.
                Just when the wind of life started blowing and I could barely
                find my feet, I remembered what you always said: the church is a
                safe haven. And Mummy Anifiwose's words as I approached
                adulthood resonated: "At crossroads when you need to speak to a
                human outside me, speak only to a Godly Mother." Oh yes, Mummy!
                I found Godly parents in my local church where I got planted.
                They are Reverend Peter Ayo-Alabi and Pastor Mrs. Funlola Alabi.
                They did a great job in raising me to become a stronger
                believer.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 0.6 }}
              >
                Well, Mummy, I never imagined this moment of my life would come
                in your absence. I miss you so much every single day, but as a
                big girl, I shake it off when the thoughts arise, reminisce, and
                cherish the beautiful moments made with you. They are evergreen
                in my head—moments we had during Christmas visits, early morning
                calls of almost an hour you made every morning when I was in
                transit to class in my early University days. Oh, Mummy! I miss
                having so many shades of pencil-shaped skirts as omo Iya
                Tailor... Lol!
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.6 }}
              >
                Amazingly, Mummy, I am about to move into a new phase of my life
                with one of the best men in the world. His name is Tolulope
                Michael Ojo—highly industrious, supportive, caring, selfless,
                intentional, creative, God-fearing, and cute! He makes me feel
                safe and bold to be me. He believes in me and supports my dreams
                with all of his being. He is my best friend, and we will make
                you proud.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 0.6 }}
              >
                Mummy Anifowose has one of the best marriages I know, and she
                always blesses me that my marriage will be sweeter than hers. I
                am so positive about this prayer of hers. With the choice of
                partner I was prayerfully guided to make, with continuous
                intentional effort, and God as our foundation, we will enjoy
                every phase of it without regrets. As I begin this new chapter
                in my life, I take comfort in knowing I made you proud!
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.0, duration: 0.6 }}
                className="pt-4 border-t-2 border-amber-200"
              >
                <p className="text-center lg:text-left italic text-gray-600">
                  "Mummy, I love you more than words can express. Your memory
                  will forever be cherished in my heart. Thank you for being my
                  rock, my guiding light, and my everything. Till we meet again,
                  keep resting while I keep smashing goals and making you
                  proud."
                </p>
              </motion.div>
            </div>

            {/* Closing Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 0.6 }}
              className="mt-12 p-8 bg-white border border-amber-200/30 rounded-3xl shadow-sm"
            >
              <p
                className="text-2xl md:text-3xl text-center text-gray-800 mb-4"
                style={{ fontFamily: "var(--font-tangerine)" }}
              >
                Cheers to You, Mummy
              </p>
              <p className="text-center text-gray-600">
                I raise a glass to you, Mummy, in celebration of your life and
                love. This day is dedicated to your memory, celebrated in your
                honor, and lived in the way you showed us—with grace, with love,
                and with gratitude for every precious moment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

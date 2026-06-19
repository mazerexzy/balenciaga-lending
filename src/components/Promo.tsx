import Promo from '../assets/promo.jpg';

import { motion } from 'framer-motion';

import RevealText from './RevealText';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3, // Задержка между появлением детей
        },
    },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 40 }, // Стартуем снизу и невидимыми
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" } // Плавно встаем на место
    },
} as const;


export const PromoSection = () => {
    return (<section className='h-screen w-full flex flex-col items-center justify-center bg-black text-white relative'
        style={{ height: '100vh', backgroundImage: `url(${Promo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='absolute inset-0 bg-black opacity-50'></div> {/* Полупрозрачный черный слой для улучшения читаемости текста */}
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className='relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start px-6 md:px-12 gap-8'
        >
            <motion.h1 variants={itemVariants} className='font-rubik text-7xl font-bold uppercase tracking-tighter md:text-left text-center cursor-default'>
                New Collection
            </motion.h1>

            <RevealText
                text="WE ARE DECONSTRUCTING THE SILHOUETTE OF THE MODERN URBAN LANDSCAPE. EACH PIECE IS A SYNERGY OF RAW INDUSTRIAL MINIMALISM AND UNCOMPROMISING FUNCTIONAL UTILITY. DESIGNED IN SHADOWS, ARCHITECTED FOR THE AVANT-GARDE."
                className=" font-eater text-xl md:text-3xl font-light uppercase tracking-wide text-gray-300 max-w-xl md:text-right text-center md:justify-end cursor-default"
            />
        </motion.div>
    </section>
    );
}
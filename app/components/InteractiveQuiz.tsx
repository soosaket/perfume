"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/app/context/AppContext";
import { Sparkles, ArrowRight, RotateCcw, ShoppingBag, ShieldCheck, Star } from "lucide-react";
import { playGlobalSpraySound } from "./SoundPlayer";

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    description: string;
    points: { [key: string]: number };
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: "Select your desired projection aura:",
    options: [
      {
        label: "Majestic, Imperial & Smoky",
        description: "Bold Middle Eastern agarwood and dark resins that command absolute attention.",
        points: { "oud-royal": 3, "royal-amber-attar": 3 }
      },
      {
        label: "Peaceful, Calming & Botanical",
        description: "A soft, personal halo of organic sandalwood and soothing rosewater.",
        points: { "sandalwood-therapy": 3 }
      },
      {
        label: "Sweet, Decadent & Addictive",
        description: "Irresistible gourmet cocoa, hot caramel, and Madagascar vanilla beans.",
        points: { "gourmand-chocolate": 3 }
      },
      {
        label: "Sophisticated, Crisp & Prestigious",
        description: "Fresh laundry notes, sparkling Italian citrus, and premium roses.",
        points: { "signature-paris": 3 }
      }
    ]
  },
  {
    id: 2,
    text: "What is the primary fabric you intend to adorn?",
    options: [
      {
        label: "Heavy Silk, Velvet & Brocade",
        description: "Rich materials that latch onto deep wood resins and animalic notes.",
        points: { "oud-royal": 2, "royal-amber-attar": 2 }
      },
      {
        label: "Linen, Raw Cotton & Athletic Attire",
        description: "Light fibers that thrive with pure herbal essential oils and vetiver.",
        points: { "sandalwood-therapy": 2 }
      },
      {
        label: "Cozy Wool, Cashmere & Knitwear",
        description: "Warm fibers that beautifully amplify honey, caramel, and vanilla notes.",
        points: { "gourmand-chocolate": 2 }
      },
      {
        label: "Premium Dress Shirts, Suits & Linens",
        description: "Crisp cotton threads designed for fresh laundry sillage and clean musks.",
        points: { "signature-paris": 2 }
      }
    ]
  },
  {
    id: 3,
    text: "Select your preferred emotional atmosphere:",
    options: [
      {
        label: "Dominant, Mysterious & Ancient",
        description: "A scent that speaks of royal heritage, deep night, and golden palace walls.",
        points: { "oud-royal": 2, "royal-amber-attar": 2 }
      },
      {
        label: "Relaxed, Grounded & Pure",
        description: "A centering botanical cloud that cools the spirit and brings nature's peace.",
        points: { "sandalwood-therapy": 2 }
      },
      {
        label: "Sensual, Warm & Comforting",
        description: "A delicious, cozy scent that invites close contact and leaves a gourmet trace.",
        points: { "gourmand-chocolate": 2 }
      },
      {
        label: "Confident, Modern & Clean",
        description: "A sharp, freshly tailored breeze that exudes high status and luxury fashion.",
        points: { "signature-paris": 2 }
      }
    ]
  },
  {
    id: 4,
    text: "Select your preferred concentration & longevity profile:",
    options: [
      {
        label: "Imperial Strength (70% - 80% Oil)",
        description: "Engineered for maximum fabric binding. Remains present up to 5-6 days.",
        points: { "oud-royal": 2, "royal-amber-attar": 3, "gourmand-chocolate": 1, "signature-paris": 1 }
      },
      {
        label: "Gentle Aura (65% Oil)",
        description: "Engineered for close-up, personal encounters. Remains present up to 2-3 days.",
        points: { "sandalwood-therapy": 3, "signature-paris": 1 }
      }
    ]
  }
];

export default function InteractiveQuiz() {
  const { products, addToCart, setCartOpen } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    "oud-royal": 0,
    "sandalwood-therapy": 0,
    "gourmand-chocolate": 0,
    "signature-paris": 0,
    "royal-amber-attar": 0
  });
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [recommendedProduct, setRecommendedProduct] = useState<any>(null);

  const handleOptionSelect = (points: { [key: string]: number }) => {
    // Play luxurious mist sound on every click for sensory feedback!
    playGlobalSpraySound();

    // Accumulate scores
    const newScores = { ...scores };
    Object.keys(points).forEach((key) => {
      newScores[key] = (newScores[key] || 0) + points[key];
    });
    setScores(newScores);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate winner
      let winnerId = "oud-royal";
      let maxScore = -1;
      
      Object.keys(newScores).forEach((key) => {
        if (newScores[key] > maxScore) {
          maxScore = newScores[key];
          winnerId = key;
        }
      });

      const matchedProduct = products.find((p) => p.id === winnerId) || products[0];
      setRecommendedProduct(matchedProduct);
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    playGlobalSpraySound();
    setCurrentStep(0);
    setScores({
      "oud-royal": 0,
      "sandalwood-therapy": 0,
      "gourmand-chocolate": 0,
      "signature-paris": 0,
      "royal-amber-attar": 0
    });
    setQuizFinished(false);
    setRecommendedProduct(null);
  };

  const handlePurchaseRecommended = () => {
    if (!recommendedProduct) return;
    addToCart(recommendedProduct, 1, "100ml");
    setCartOpen(true);
  };

  const activeQuestion = quizQuestions[currentStep];
  const progressPercent = ((currentStep) / quizQuestions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#121212]/40 backdrop-blur-md rounded-2xl border border-gold/20 p-6 md:p-12 shadow-2xl relative overflow-hidden">
      
      {/* Background soft gold glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

      {!quizFinished ? (
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] bg-gold/10 border border-gold/30 text-gold px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-2.5 h-2.5" />
              Olfactory Aura Matcher
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white uppercase tracking-widest leading-tight">
              Discover Your Olfactory Profile
            </h3>
            <p className="text-xs text-white/50 max-w-md mx-auto mt-2">
              Answer our master perfumers' questions to isolate the precise organic oil profile intended for your attires.
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-gold-gradient transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent || 5}%` }}
            />
          </div>

          {/* Question text */}
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
              Question {currentStep + 1} of {quizQuestions.length}
            </span>
            <h4 className="font-serif text-lg md:text-xl text-white mt-1">
              {activeQuestion.text}
            </h4>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(opt.points)}
                className="text-left bg-black/40 hover:bg-gold/10 border border-white/5 hover:border-gold/50 rounded-xl p-5 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="font-serif text-sm text-white font-medium group-hover:text-gold transition-colors">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-white/40 group-hover:text-white/60 transition-colors mt-2">
                  {opt.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 text-center animate-fade-in">
          {/* Scent Result */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] bg-gold/15 border border-gold/40 text-gold px-3.5 py-1.5 rounded-full mb-4 animate-gold-shine">
              Your Olfactory Aura is Revealed
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-widest">
              {recommendedProduct?.name.replace("SWAVIK ", "")}
            </h3>
            <p className="text-xs text-gold font-medium mt-1 uppercase tracking-widest">
              Matched Scent Profile: {recommendedProduct?.scentProfile}
            </p>
          </div>

          {/* Recommended Product Box */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-black/50 border border-gold/10 rounded-2xl p-6 text-left mb-8 max-w-2xl mx-auto items-center">
            {/* Image */}
            <div className="md:col-span-2 relative h-40 bg-black/75 rounded-lg border border-white/5 overflow-hidden flex items-center justify-center p-2">
              <Image
                src={recommendedProduct?.image}
                alt={recommendedProduct?.name}
                fill
                className="object-contain p-4 animate-float-medium"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <div className="flex items-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
                <span className="text-[10px] text-white/50 ml-1">({recommendedProduct?.rating} / 5.0)</span>
              </div>
              
              <p className="text-xs leading-relaxed text-white/60">
                {recommendedProduct?.description}
              </p>

              <div className="flex flex-wrap gap-2 text-[10px] text-white/50 mt-1">
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10">
                  {recommendedProduct?.concentration}
                </span>
                <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-gold">
                  Longevity: {recommendedProduct?.longevity}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="font-serif text-lg font-bold text-white">${recommendedProduct?.price}</span>
                
                <div className="flex gap-2">
                  <button
                    onClick={handleReset}
                    className="p-2 border border-white/10 hover:border-gold hover:text-gold text-white/60 rounded-md transition-colors"
                    title="Retake Quiz"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handlePurchaseRecommended}
                    className="flex items-center gap-1.5 bg-gold hover:bg-gold-light text-black text-xs font-bold uppercase py-2 px-4 rounded-md transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Acquire Aura
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust points */}
          <div className="flex justify-center items-center gap-6 text-[10px] text-white/40">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>70% High Oil Fabric Binding</span>
            </div>
            <span>&bull;</span>
            <div>100% Organic Distillation</div>
          </div>
        </div>
      )}
    </div>
  );
}

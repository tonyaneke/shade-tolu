import { RSVPForm } from "@/src/ui/RSVPForm";

export default function RSVPPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-white">
      <RSVPForm />
      <div className="px-6 pb-12">
        <div className="max-width: 100%; max-width: 56rem; margin: 0 auto;">
          <div className="mt-8 p-4 md:p-5 border border-amber-300/60 bg-amber-50/50 rounded-xl">
            <p className="text-center text-sm md:text-base font-semibold tracking-wide text-amber-800">
              DISCLAIMER: ATTENDANCE IS STRICTLY BY INVITATION. ALL ARRANGEMENTS ARE FOR INVITED GUESTS ONLY
            </p>
            <p className="mt-2 text-center text-xs md:text-sm text-amber-800">
              ACCESS CARD VALIDATES ENTRY FOR JUST 1 PERSON
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


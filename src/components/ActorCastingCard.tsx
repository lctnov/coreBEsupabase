"use client";

import { useState } from "react";
import { ActorCastingInfor } from "@/pages/created/ActorCastingInfor";
import { Button, Card } from "antd";
import { RecruiterCastingInfor } from "@/pages/created/RecruiterCastingInfor";

interface ActionCardProps {
  icon: string;
  title: string;
  items: string[];
  btnText: string;
  onAction: (type: string) => void;
}

interface ActorCastingCardProps {
  data?: Omit<ActionCardProps, "onAction">[];
}

export default function ActorCastingCard({ data = [] }: ActorCastingCardProps) {
  const [openActor, setOpenActor] = useState(false);
  const [openRecruiter, setOpenRecruiter] = useState(false);
  
  const handleClick = (type: string) => {
    if (type.includes("DIỄN VIÊN")) {
      setOpenActor(true);
    } else {
      setOpenRecruiter(true);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.map((item, index) => (
            <ActionCard
              key={index}
              {...item}
              onAction={handleClick}
            />
          ))}
        </div>
      </div>

      {/* ✅ ACTOR */}
      <ActorCastingInfor
        open={openActor}
        onClose={() => setOpenActor(false)}
        remainSlots={1}
      />

      {/* RECRUITER */}
      <RecruiterCastingInfor
        open={openRecruiter}
        onClose={() => setOpenRecruiter(false)}
        remainSlots={1}
      />
    </>
  );
}

function ActionCard({
  icon,
  title,
  items,
  btnText,
  onAction,
}: ActionCardProps) {
  return (
    <Card className="p-8 text-center rounded-2xl border shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-xl text-white rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-md">
        {icon}
      </div>

      <h4 className="mb-5 text-white text-lg font-bold">
        {title}
      </h4>

      <ul className="mb-6 space-y-2 text-sm text-gray-700 leading-relaxed dark:text-gray-300">
        {items.map((text, i) => (
          <li key={i}>• {text}</li>
        ))}
      </ul>

      <Button
        type="primary"
        className="px-6 py-2 font-semibold rounded-full"
        onClick={() => onAction(title)}
      >
        {btnText}
      </Button>
    </Card>
  );
}

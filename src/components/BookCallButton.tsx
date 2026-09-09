"use client";

import { CalendarBlank } from "@phosphor-icons/react";
import { CAL_LINK } from "@/lib/cal";

export default function BookCallButton({
  className = "btn-cta btn-cta-ghost",
  label = "Book a call",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      className={className}
    >
      {label}
      <CalendarBlank size={16} weight="bold" />
    </button>
  );
}

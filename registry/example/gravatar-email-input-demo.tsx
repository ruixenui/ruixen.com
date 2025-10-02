"use client";

import GravatarEmailInput from "../ruixenui/gravatar-email-input";

export default function Demo() {
  const handleEmailChange = (email: string) => {
    console.log("Email changed:", email);
  };

  return (
    <div className="flex items-center justify-center">
      <GravatarEmailInput
        initialValue="test@example.com"
        onChange={handleEmailChange}
      />
    </div>
  );
}

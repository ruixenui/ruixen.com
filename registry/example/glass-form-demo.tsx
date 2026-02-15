"use client";

import {
  GlassForm,
  FormGroup,
  FormField,
  FormToggle,
  FormSegment,
  FormButton,
} from "@/registry/ruixenui/glass-form";

export default function GlassFormDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 16px",
      }}
    >
      <GlassForm onSubmit={() => console.log("submitted")}>
        <FormGroup title="Account">
          <FormField label="Name" placeholder="John Appleseed" />
          <FormField
            label="Email"
            type="email"
            placeholder="john@example.com"
          />
          <FormField label="Password" type="password" placeholder="Required" />
        </FormGroup>

        <FormGroup
          title="Preferences"
          footer="Choose how you'd like to receive updates."
        >
          <FormToggle label="Notifications" defaultChecked />
          <FormToggle label="Marketing" description="Receive product updates" />
          <FormSegment
            label="Theme"
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
              { label: "Auto", value: "auto" },
            ]}
            defaultValue="dark"
          />
        </FormGroup>

        <FormButton>Create Account</FormButton>
        <FormButton variant="text">Already have an account? Sign in</FormButton>
      </GlassForm>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import Color from "color";
import { PipetteIcon } from "lucide-react";
import {
  type ChangeEventHandler,
  type ComponentProps,
  type HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createContext, useContext } from "react";

interface ColorPickerContextValue {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  mode: string;
  setHue: (hue: number) => void;
  setSaturation: (saturation: number) => void;
  setLightness: (lightness: number) => void;
  setAlpha: (alpha: number) => void;
  setMode: (mode: string) => void;
}

const ColorPickerContext = createContext<ColorPickerContextValue | undefined>(
  undefined,
);

export const useColorPicker = () => {
  const context = useContext(ColorPickerContext);

  if (!context) {
    throw new Error("useColorPicker must be used within a ColorPickerProvider");
  }

  return context;
};

export type ColorPickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Parameters<typeof Color>[0];
  defaultValue?: Parameters<typeof Color>[0];
  onChange?: (value: Parameters<typeof Color.rgb>[0]) => void;
};

export const ColorPicker = ({
  value,
  defaultValue = "#000000",
  onChange,
  className,
  ...props
}: ColorPickerProps) => {
  const [hue, setHue] = useState(() => {
    try {
      const color = value ? Color(value) : Color(defaultValue);
      return color.hue() || 0;
    } catch {
      return 0;
    }
  });
  const [saturation, setSaturation] = useState(() => {
    try {
      const color = value ? Color(value) : Color(defaultValue);
      return color.saturationl() || 100;
    } catch {
      return 100;
    }
  });
  const [lightness, setLightness] = useState(() => {
    try {
      const color = value ? Color(value) : Color(defaultValue);
      return color.lightness() || 50;
    } catch {
      return 50;
    }
  });
  const [alpha, setAlpha] = useState(() => {
    try {
      const color = value ? Color(value) : Color(defaultValue);
      return color.alpha() * 100 || 100;
    } catch {
      return 100;
    }
  });
  const [mode, setMode] = useState("hex");

  // Update color when controlled value changes (only on mount or when value prop changes significantly)
  useEffect(() => {
    if (value) {
      try {
        const color = Color(value);
        const [h, s, l] = color.hsl().array();
        const a = color.alpha() * 100;

        // Only update if values are significantly different to avoid loops
        if (
          Math.abs(h - hue) > 1 ||
          Math.abs(s - saturation) > 1 ||
          Math.abs(l - lightness) > 1 ||
          Math.abs(a - alpha) > 1
        ) {
          setHue(h);
          setSaturation(s);
          setLightness(l);
          setAlpha(a);
        }
      } catch (error) {
        console.error("Invalid color value:", error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      const color = Color.hsl(hue, saturation, lightness).alpha(alpha / 100);
      const rgba = color.rgb().array();
      onChange([rgba[0], rgba[1], rgba[2], alpha / 100]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hue, saturation, lightness, alpha]);

  return (
    <ColorPickerContext.Provider
      value={{
        hue,
        saturation,
        lightness,
        alpha,
        mode,
        setHue,
        setSaturation,
        setLightness,
        setAlpha,
        setMode,
      }}
    >
      <div className={cn("grid w-full gap-4", className)} {...props} />
    </ColorPickerContext.Provider>
  );
};

export type ColorPickerSelectionProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerSelection = ({
  className,
  ...props
}: ColorPickerSelectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { hue, saturation, lightness, setSaturation, setLightness } =
    useColorPicker();

  const [position, setPosition] = useState(() => ({
    x: saturation / 100,
    y: 1 - lightness / 100,
  }));

  // Sync position with current color values
  useEffect(() => {
    if (!isDragging) {
      setPosition({
        x: saturation / 100,
        y: 1 - lightness / 100,
      });
    }
  }, [saturation, lightness, isDragging]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!isDragging || !containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(1, (event.clientX - rect.left) / rect.width),
      );
      const y = Math.max(
        0,
        Math.min(1, (event.clientY - rect.top) / rect.height),
      );

      setPosition({ x, y });
      setSaturation(x * 100);
      setLightness((1 - y) * 100);
    },
    [isDragging, setSaturation, setLightness],
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", () => setIsDragging(false));
    };
  }, [isDragging, handlePointerMove]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full cursor-crosshair rounded",
        className,
      )}
      style={{
        background: `linear-gradient(0deg,rgb(0,0,0),transparent),linear-gradient(90deg,rgb(255,255,255),hsl(${hue},100%,50%))`,
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        setIsDragging(true);
        handlePointerMove(e.nativeEvent);
      }}
      {...props}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute h-4 w-4 rounded-full border-2 border-white"
        style={{
          left: `${position.x * 100}%`,
          top: `${position.y * 100}%`,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
};

export type ColorPickerHueProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerHue = ({
  className,
  ...props
}: ColorPickerHueProps) => {
  const { hue, setHue } = useColorPicker();

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <div className="relative h-3 w-full rounded-full bg-[linear-gradient(90deg,#FF0000,#FFFF00,#00FF00,#00FFFF,#0000FF,#FF00FF,#FF0000)]">
        <Slider
          value={[hue]}
          max={360}
          step={1}
          onValueChange={(values: number[]) => setHue(values[0])}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
};

export type ColorPickerAlphaProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerAlpha = ({
  className,
  ...props
}: ColorPickerAlphaProps) => {
  const { alpha, setAlpha, hue, saturation, lightness } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness);
  const rgb = color.rgb().array();

  return (
    <div className={cn("relative w-full", className)} {...props}>
      <div
        className="relative h-3 w-full rounded-full"
        style={{
          background: `linear-gradient(to right, transparent, rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}))`,
        }}
      >
        <Slider
          value={[alpha]}
          max={100}
          step={1}
          onValueChange={(values: number[]) => setAlpha(values[0])}
          className="absolute inset-0"
        />
      </div>
    </div>
  );
};

export type ColorPickerEyeDropperProps = ComponentProps<typeof Button>;

export const ColorPickerEyeDropper = ({
  className,
  ...props
}: ColorPickerEyeDropperProps) => {
  const { setHue, setSaturation, setLightness, setAlpha } = useColorPicker();

  const handleEyeDropper = async () => {
    try {
      // @ts-ignore - EyeDropper API is experimental
      const eyeDropper = new EyeDropper();
      const result = await eyeDropper.open();
      const color = Color(result.sRGBHex);
      const [h, s, l] = color.hsl().array();

      setHue(h);
      setSaturation(s);
      setLightness(l);
      setAlpha(100);
    } catch (error) {
      console.error("EyeDropper failed:", error);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleEyeDropper}
      className={cn("shrink-0 text-muted-foreground", className)}
      {...props}
    >
      <PipetteIcon size={16} />
    </Button>
  );
};

export type ColorPickerOutputProps = ComponentProps<typeof SelectTrigger>;

const formats = ["hex", "rgb", "css", "hsl"];

export const ColorPickerOutput = ({
  className,
  ...props
}: ColorPickerOutputProps) => {
  const { mode, setMode } = useColorPicker();

  return (
    <Select value={mode} onValueChange={setMode}>
      <SelectTrigger className="h-8 w-[4.5rem] shrink-0 text-xs" {...props}>
        <SelectValue placeholder="Mode" />
      </SelectTrigger>
      <SelectContent>
        {formats.map((format) => (
          <SelectItem key={format} value={format} className="text-xs">
            {format.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

type PercentageInputProps = ComponentProps<typeof Input>;

const PercentageInput = ({ className, ...props }: PercentageInputProps) => {
  return (
    <div className="relative">
      <Input
        type="text"
        {...props}
        className={cn(
          "h-8 w-[3.25rem] rounded-l-none bg-secondary px-2 text-xs shadow-none",
          className,
        )}
      />
      <span className="-translate-y-1/2 absolute top-1/2 right-2 text-muted-foreground text-xs">
        %
      </span>
    </div>
  );
};

export type ColorPickerFormatProps = HTMLAttributes<HTMLDivElement>;

export const ColorPickerFormat = ({
  className,
  ...props
}: ColorPickerFormatProps) => {
  const {
    hue,
    saturation,
    lightness,
    alpha,
    mode,
    setHue,
    setSaturation,
    setLightness,
    setAlpha,
  } = useColorPicker();
  const color = Color.hsl(hue, saturation, lightness, alpha / 100);

  if (mode === "hex") {
    const hex = color.hex();

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      try {
        const newColor = Color(event.target.value);
        setHue(newColor.hue());
        setSaturation(newColor.saturationl());
        setLightness(newColor.lightness());
        setAlpha(newColor.alpha() * 100);
      } catch (error) {
        console.error("Invalid hex color:", error);
      }
    };

    return (
      <div
        className={cn(
          "-space-x-px relative flex items-center shadow-sm",
          className,
        )}
        {...props}
      >
        <span className="-translate-y-1/2 absolute top-1/2 left-2 text-xs">
          #
        </span>
        <Input
          type="text"
          value={hex}
          onChange={handleChange}
          className="h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none"
        />
        <PercentageInput value={alpha} readOnly />
      </div>
    );
  }

  if (mode === "rgb") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn("-space-x-px flex items-center shadow-sm", className)}
        {...props}
      >
        {rgb.map((value, index) => (
          <Input
            key={index}
            type="text"
            value={value}
            readOnly
            className={cn(
              "h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none",
              index && "rounded-l-none",
              className,
            )}
          />
        ))}
        <PercentageInput value={alpha} readOnly />
      </div>
    );
  }

  if (mode === "css") {
    const rgb = color
      .rgb()
      .array()
      .map((value) => Math.round(value));

    return (
      <div className={cn("w-full shadow-sm", className)} {...props}>
        <Input
          type="text"
          className="h-8 w-full bg-secondary px-2 text-xs shadow-none"
          value={`rgba(${rgb.join(", ")}, ${alpha}%)`}
          readOnly
        />
      </div>
    );
  }

  if (mode === "hsl") {
    const hsl = color
      .hsl()
      .array()
      .map((value) => Math.round(value));

    return (
      <div
        className={cn("-space-x-px flex items-center shadow-sm", className)}
        {...props}
      >
        {hsl.map((value, index) => (
          <Input
            key={index}
            type="text"
            value={value}
            readOnly
            className={cn(
              "h-8 rounded-r-none bg-secondary px-2 text-xs shadow-none",
              index && "rounded-l-none",
              className,
            )}
          />
        ))}
        <PercentageInput value={alpha} readOnly />
      </div>
    );
  }

  return null;
};

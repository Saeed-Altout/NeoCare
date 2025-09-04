import { ArduinoControlPanel } from "@/components/arduino-control-panel";

export function ArduinoControlPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <ArduinoControlPanel />
      </div>
    </div>
  );
}

"use client";

import { DeviceCard } from "@/components/device-card";

const sampleDevice = {
  id: "1",
  macAddress: "AA:BB:CC:DD:EE:FF",
  ipAddress: "192.168.1.100",
  hostname: "My-Phone",
  manufacturer: "Samsung",
  connectionType: "wifi",
  status: "online",
  ssid: "MyHomeWiFi",
  band: "5GHz",
  signalStrength: -55,
  connectionSpeed: 433,
  uploadSpeed: 12.5,
  downloadSpeed: 48.2,
  dataSent: 245,
  dataReceived: 1567,
  connectedAt: "2024-01-15T10:30:00Z",
  lastActivity: "2024-01-15T14:25:00Z",
};

export default function Page() {
  return (
    <div>
      <DeviceCard device={sampleDevice} />
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Signal, Wifi, Clock, Download, Upload } from "lucide-react";

interface ConnectedDevice {
  id: string;
  macAddress: string;
  ipAddress: string;
  hostname: string;
  manufacturer: string;
  connectionType: "wifi" | "ethernet" | "usb";
  status: "online" | "offline";
  ssid?: string;
  band?: "2.4GHz" | "5GHz" | "6GHz";
  signalStrength?: number; // dBm
  connectionSpeed?: number; // Mbps
  uploadSpeed?: number; // Mbps
  downloadSpeed?: number; // Mbps
  dataSent: number; // MB
  dataReceived: number; // MB
  connectedAt: string;
  lastActivity: string;
}

interface DeviceCardProps {
  device: ConnectedDevice;
}

export function DeviceCard({ device }: DeviceCardProps) {
  const getConnectionIcon = (type: string) => {
    switch (type) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "ethernet":
        return <Wifi className="h-4 w-4" />;
      default:
        return <Signal className="h-4 w-4" />;
    }
  };

  const getSignalQuality = (strength: number) => {
    if (strength >= -50)
      return { label: "Отличный", variant: "default" as const };
    if (strength >= -60)
      return { label: "Хороший", variant: "secondary" as const };
    if (strength >= -70)
      return { label: "Средний", variant: "outline" as const };
    return { label: "Слабый", variant: "destructive" as const };
  };

  const signalInfo = device.signalStrength
    ? getSignalQuality(device.signalStrength)
    : null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getConnectionIcon(device.connectionType)}
            <CardTitle className="text-lg">{device.hostname}</CardTitle>
          </div>
          <Badge variant={device.status === "online" ? "default" : "secondary"}>
            {device.status === "online" ? "Online" : "Offline"}
          </Badge>
        </div>
        <CardDescription>{device.manufacturer}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Основная информация */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">MAC</p>
            <p className="font-mono text-xs">{device.macAddress}</p>
          </div>
          <div>
            <p className="text-muted-foreground">IP</p>
            <p className="font-medium">{device.ipAddress}</p>
          </div>
        </div>

        {/* Информация о подключении */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Тип подключения</span>
            <Badge variant="outline" className="flex items-center gap-1">
              {getConnectionIcon(device.connectionType)}
              {device.connectionType === "wifi" ? "Wi-Fi" : "Ethernet"}
            </Badge>
          </div>

          {device.connectionType === "wifi" && (
            <>
              {device.ssid && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Сеть</span>
                  <span>{device.ssid}</span>
                </div>
              )}
              {device.band && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Диапазон</span>
                  <Badge variant="secondary">{device.band}</Badge>
                </div>
              )}
              {device.signalStrength && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Сигнал</span>
                  <div className="flex items-center gap-2">
                    <span>{device.signalStrength} dBm</span>
                    {signalInfo && (
                      <Badge variant={signalInfo.variant}>
                        {signalInfo.label}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              {device.connectionSpeed && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Скорость</span>
                  <span>{device.connectionSpeed} Mbps</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Статистика трафика */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Трафик</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Upload className="h-3 w-3 text-green-600" />
              <span>Отправлено:</span>
              <span className="font-medium">{device.dataSent} MB</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3 text-blue-600" />
              <span>Получено:</span>
              <span className="font-medium">{device.dataReceived} MB</span>
            </div>
          </div>
        </div>

        {/* Время */}
        <div className="pt-2 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span className="text-muted-foreground">Подключен</span>
            </div>
            <span>{new Date(device.connectedAt).toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

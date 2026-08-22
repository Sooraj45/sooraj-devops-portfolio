export const bootSequence = [
  "SYSTEM INITIALIZING...",
  "CONNECTING CLOUD...",
  "VERIFYING NETWORK...",
  "SECURITY CHECK...",
  "DEPLOYMENT READY",
];

export type NodeTone = "cyan" | "amber" | "violet";

export interface NetNode {
  id: string;
  label: string;
  status?: string;
  tone: NodeTone;
  x: number;
  y: number;
  primary: boolean;
}

export const netNodes: NetNode[] = [
  { id: "user", label: "USER", tone: "violet", x: 50, y: 4, primary: false },
  { id: "dns", label: "DNS", status: "ONLINE", tone: "cyan", x: 50, y: 17, primary: true },
  { id: "waf", label: "WAF", status: "PROTECTED", tone: "amber", x: 50, y: 31, primary: true },
  { id: "lb", label: "LB", status: "BALANCED", tone: "cyan", x: 50, y: 45, primary: true },
  { id: "ec2", label: "EC2", status: "RUNNING", tone: "cyan", x: 50, y: 59, primary: true },
  { id: "app", label: "APP", status: "HEALTHY", tone: "cyan", x: 50, y: 73, primary: true },
  { id: "db", label: "DB", status: "SYNCED", tone: "cyan", x: 28, y: 89, primary: true },
  { id: "s3", label: "S3", status: "BACKUP OK", tone: "amber", x: 72, y: 89, primary: true },
];

export interface NetEdge {
  from: string;
  to: string;
  reverse?: boolean;
}

export const netEdges: NetEdge[] = [
  { from: "user", to: "dns" },
  { from: "dns", to: "waf" },
  { from: "waf", to: "lb" },
  { from: "lb", to: "ec2" },
  { from: "ec2", to: "app" },
  { from: "app", to: "db" },
  { from: "app", to: "s3", reverse: true },
];

export interface SecondaryNode {
  id: string;
  label: string;
  x: number;
  y: number;
  near: string;
}

export const secondaryNodes: SecondaryNode[] = [
  { id: "vpn", label: "VPN", x: 8, y: 33, near: "waf" },
  { id: "monitor", label: "MONITOR", x: 92, y: 59, near: "ec2" },
  { id: "backup", label: "BACKUP", x: 92, y: 83, near: "s3" },
];

export interface HudLabel {
  text: string;
  x: number;
  y: number;
  align?: "left" | "right";
}

export const hudLabels: HudLabel[] = [
  { text: "SYS_01 / NODE_04", x: 2, y: 6, align: "left" },
  { text: "VPC_ACTIVE", x: 2, y: 96, align: "left" },
  { text: "REGION: AP-SOUTH-1", x: 98, y: 6, align: "right" },
  { text: "NETWORK SECURE", x: 98, y: 96, align: "right" },
];

export const backgroundParticles = [
  { x: 8, y: 12, size: 2, delay: 0 }, { x: 22, y: 6, size: 1, delay: .4 },
  { x: 41, y: 18, size: 2, delay: .8 }, { x: 63, y: 9, size: 1, delay: 1.2 },
  { x: 78, y: 22, size: 2, delay: .2 }, { x: 91, y: 14, size: 1, delay: .6 },
  { x: 12, y: 42, size: 1, delay: 1 }, { x: 34, y: 58, size: 2, delay: .3 },
  { x: 6, y: 74, size: 1, delay: .9 }, { x: 88, y: 46, size: 2, delay: .5 },
  { x: 95, y: 68, size: 1, delay: 1.4 }, { x: 55, y: 84, size: 1, delay: .7 },
  { x: 25, y: 90, size: 2, delay: 1.1 }, { x: 70, y: 92, size: 1, delay: .1 },
  { x: 46, y: 4, size: 1, delay: 1.3 }, { x: 15, y: 60, size: 2, delay: .6 },
];

export const terminalScripts: string[][] = [
  ["$ kubectl get pods", "api-server       Running", "worker           Running", "redis            Running", "monitor          Running"],
  ["$ terraform apply", "Plan: 8 to add, 3 to change, 0 to destroy", "Apply complete. Resources: 8 added"],
  ["$ deploy production", "building...", "tests passed", "container ready", "deploying...", "production online ✓"],
];

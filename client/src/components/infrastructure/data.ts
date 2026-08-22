export type WorkflowType = "planning" | "configure" | "security" | "deploy" | "monitor" | "backup" | "maintenance";

export interface InfrastructureStep {
  title: string;
  technology: string;
  type: WorkflowType;
}

export const infrastructureSteps: InfrastructureStep[] = [
  { title: "PLAN", technology: "requirements", type: "planning" },
  { title: "CONFIGURE", technology: "AWS / Linux / Hyper-V", type: "configure" },
  { title: "SECURE", technology: "WAF / Firewall / VPN", type: "security" },
  { title: "DEPLOY", technology: "AWS EC2 / S3", type: "deploy" },
  { title: "MONITOR", technology: "Atera / ManageEngine", type: "monitor" },
  { title: "BACKUP", technology: "Acronis / Veeam", type: "backup" },
  { title: "MAINTAIN", technology: "Microsoft 365 / AD", type: "maintenance" },
];

export type NodeTone = "cyan" | "amber";

export interface ArchitectureNode {
  id: string;
  label: string;
  status: string;
  tone: NodeTone;
}

export const architectureNodes: ArchitectureNode[] = [
  { id: "dns", label: "DNS", status: "ONLINE", tone: "cyan" },
  { id: "waf", label: "WAF", status: "PROTECTED", tone: "amber" },
  { id: "ec2", label: "EC2", status: "RUNNING", tone: "cyan" },
  { id: "app", label: "APP", status: "HEALTHY", tone: "cyan" },
  { id: "s3", label: "S3", status: "SYNCED", tone: "amber" },
];

export const architectureFooter = ["DNS → WAF", "EC2 → APP", "S3 → ASSETS"];

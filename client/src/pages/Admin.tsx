import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Users, MapPin, QrCode, TrendingUp, Plus, Settings, BarChart3, UserPlus, Crown, Gem, Download, Printer, Eye } from "lucide-react";
import QRCode from "qrcode";
import { artifacts as initialArtifacts, Artifact } from "@/data/artifacts";

const Admin = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [newArtifact, setNewArtifact] = useState({
    slug: "",
    title: "",
    summary: "",
    imageUrl: "",
  });
  const [qrCodes, setQrCodes] = useState<{ [slug: string]: string }>({});
  const [showPrintLayout, setShowPrintLayout] = useState(false);
  const canvasRefs = useRef<{ [slug: string]: HTMLCanvasElement | null }>({});

  const stats = [
    {
      title: "Total Users",
      value: "1,247",
      change: "+12% from last month",
      icon: Users,
      color: "bg-primary",
    },
    {
      title: "Active Hunts",
      value: "23",
      change: "+3 new this week",
      icon: MapPin,
      color: "bg-accent",
    },
    {
      title: "Artifacts Scanned",
      value: artifacts.length.toString(),
      change: `${artifacts.length - initialArtifacts.length} new artifacts`,
      icon: QrCode,
      color: "bg-secondary",
    },
    {
      title: "Revenue",
      value: "₹2,45,000",
      change: "+8% from last month",
      icon: TrendingUp,
      color: "bg-primary",
    },
  ];

  // Generate QR codes for all artifacts
  useEffect(() => {
    const generateQRCodes = async () => {
      const codes: { [slug: string]: string } = {};
      for (const artifact of artifacts) {
        try {
          const qrCodeDataUrl = await QRCode.toDataURL(
            `${window.location.origin}/artifacts/${artifact.slug}`,
            {
              width: 200,
              margin: 2,
              color: {
                dark: '#0f766e',
                light: '#ffffff'
              }
            }
          );
          codes[artifact.slug] = qrCodeDataUrl;
        } catch (error) {
          console.error('Error generating QR code for', artifact.slug, error);
        }
      }
      setQrCodes(codes);
    };

    generateQRCodes();
  }, [artifacts]);

  const handleCreateArtifact = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newArtifact.slug || !newArtifact.title || !newArtifact.summary) {
      return;
    }

    const artifact: Artifact = {
      ...newArtifact,
      quickFacts: ["Created by admin", "Available for discovery"],
      trivia: [
        {
          question: "What type of artifact is this?",
          options: ["Historical", "Cultural", "Archaeological", "Artistic"],
          answerIndex: 0
        }
      ]
    };

    setArtifacts(prev => [...prev, artifact]);
    setNewArtifact({ slug: "", title: "", summary: "", imageUrl: "" });
  };

  const downloadQRCode = (slug: string, title: string) => {
    const qrCodeDataUrl = qrCodes[slug];
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `qr-${slug}.png`;
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (showPrintLayout) {
    return (
      <>
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body { margin: 0; }
              .print-layout { 
                width: 210mm; 
                height: 297mm; 
                margin: 0; 
                padding: 10mm;
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                gap: 5mm;
              }
              .qr-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 1px solid #ccc;
                padding: 5mm;
                page-break-inside: avoid;
              }
              .no-print { display: none !important; }
            }
          `
        }} />
        <div className="p-4 no-print">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Print Layout - 4 QR Codes per Page</h1>
            <div className="space-x-2">
              <Button onClick={handlePrint} data-testid="button-print">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowPrintLayout(false)}
                data-testid="button-exit-print"
              >
                <Eye className="mr-2 h-4 w-4" />
                Exit Print View
              </Button>
            </div>
          </div>
        </div>
        <div className="print-layout">
          {artifacts.slice(0, 4).map((artifact) => (
            <div key={artifact.slug} className="qr-item">
              {qrCodes[artifact.slug] && (
                <img 
                  src={qrCodes[artifact.slug]} 
                  alt={`QR code for ${artifact.title}`}
                  className="w-32 h-32 mb-2"
                />
              )}
              <h3 className="text-lg font-semibold text-center">{artifact.title}</h3>
              <p className="text-sm text-center text-gray-600">Scan to discover</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-admin-title">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground" data-testid="text-admin-subtitle">
          Manage artifacts, hunts, and system settings
        </p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold" data-testid={`text-admin-stat-${index}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" />
                  </div>
                </div>
                <div className="mt-2 text-sm text-accent">{stat.change}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create New Artifact */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4" data-testid="text-create-artifact-title">
            Create New Artifact
          </h3>
          <form onSubmit={handleCreateArtifact} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={newArtifact.slug}
                  onChange={(e) => setNewArtifact(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="ancient-artifact-name"
                  required
                  data-testid="input-artifact-slug"
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newArtifact.title}
                  onChange={(e) => setNewArtifact(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ancient Artifact Name"
                  required
                  data-testid="input-artifact-title"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={newArtifact.imageUrl}
                onChange={(e) => setNewArtifact(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="https://images.example.com/artifact.jpg"
                data-testid="input-artifact-image-url"
              />
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={newArtifact.summary}
                onChange={(e) => setNewArtifact(prev => ({ ...prev, summary: e.target.value }))}
                placeholder="A detailed description of the artifact..."
                required
                data-testid="textarea-artifact-summary"
              />
            </div>
            <Button type="submit" data-testid="button-create-artifact">
              <Plus className="mr-2 h-4 w-4" />
              Create Artifact
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Artifacts with QR Codes */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold" data-testid="text-artifacts-qr-title">
              Artifacts & QR Codes
            </h3>
            <Button 
              onClick={() => setShowPrintLayout(true)}
              variant="outline"
              data-testid="button-print-layout"
            >
              <Printer className="mr-2 h-4 w-4" />
              Print 4-per-page
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artifacts.map((artifact) => (
              <Card key={artifact.slug} className="p-4">
                <div className="text-center">
                  <h4 className="font-semibold mb-2" data-testid={`text-artifact-title-${artifact.slug}`}>
                    {artifact.title}
                  </h4>
                  <div className="mb-4">
                    {qrCodes[artifact.slug] ? (
                      <img 
                        src={qrCodes[artifact.slug]} 
                        alt={`QR code for ${artifact.title}`}
                        className="w-32 h-32 mx-auto border rounded"
                        data-testid={`img-qr-code-${artifact.slug}`}
                      />
                    ) : (
                      <div className="w-32 h-32 mx-auto bg-muted rounded flex items-center justify-center">
                        <QrCode className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {artifact.summary}
                  </p>
                  <Button 
                    onClick={() => downloadQRCode(artifact.slug, artifact.title)}
                    size="sm"
                    className="w-full"
                    disabled={!qrCodes[artifact.slug]}
                    data-testid={`button-download-qr-${artifact.slug}`}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;

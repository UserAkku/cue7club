"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { PhoneCall, ChatText, MapPin, NavigationArrow } from "@phosphor-icons/react";
import { useLocationSharing } from "@/hooks/useLocationSharing";
import { motion } from "motion/react";

export default function JobDetailPage() {
  const params = useParams();
  const bookingId = params.id as string;
  
  const [status, setStatus] = useState("CONFIRMED"); // CONFIRMED -> EN_ROUTE -> ARRIVED -> COMPLETED
  
  // Custom hook that sends coordinates to Pusher while status === "EN_ROUTE"
  useLocationSharing(bookingId, status === "EN_ROUTE");

  return (
    <div className="pb-12 max-w-5xl mx-auto">
      <motion.div 
        className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="font-heading text-4xl font-bold tracking-tight">Job #{bookingId}</h1>
            <Badge variant="outline" className={`text-sm px-3 py-1 uppercase tracking-wider ${
              status === "COMPLETED" ? "text-success border-success/30" : 
              status === "EN_ROUTE" ? "text-warning border-warning/30 bg-warning/5" : 
              "text-primary border-primary/30"
            }`}>
              {status}
            </Badge>
          </div>
          <p className="text-muted-foreground text-lg">Full Home Deep Cleaning</p>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Customer & Location */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 border-white/5 bg-secondary/10 shadow-none rounded-3xl">
              <h2 className="font-heading text-xl font-semibold tracking-tight mb-6">Customer Details</h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <Avatar fallback="PS" size="lg" className="h-14 w-14 border border-white/10 shadow-sm bg-primary/20 text-primary" />
                  <div>
                    <h4 className="font-semibold text-lg tracking-tight">Priya Sharma</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button size="icon" variant="outline" className="rounded-full h-12 w-12 hover:bg-secondary/40 hover:text-foreground transition-colors border-white/10"><ChatText size={22} /></Button>
                  <Button size="icon" className="rounded-full h-12 w-12 shadow-sm hover:shadow-md transition-all"><PhoneCall size={22} weight="fill" /></Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 border-white/5 bg-secondary/10 shadow-none rounded-3xl">
              <h2 className="font-heading text-xl font-semibold tracking-tight mb-6 flex items-center gap-2">
                <MapPin className="text-primary" weight="fill" /> Service Location
              </h2>
              <p className="text-foreground text-lg mb-6">123 Green Park, Block B, New Delhi, 110016</p>
              
              <div className="h-64 w-full rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/14/11604/6859.png')] opacity-40 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="bg-primary/20 p-4 rounded-full backdrop-blur-md border border-primary/30">
                    <NavigationArrow size={28} className="text-primary" weight="fill" />
                  </div>
                  <Button variant="secondary" className="rounded-full font-medium shadow-lg backdrop-blur-lg bg-background/80 hover:bg-background border border-white/10">Open in Google Maps</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Action Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-8 border-white/10 bg-secondary/20 shadow-xl rounded-3xl sticky top-24 backdrop-blur-xl">
            <h3 className="font-heading text-xl font-semibold tracking-tight mb-8">Job Actions</h3>
            
            <div className="space-y-4">
              {status === "CONFIRMED" && (
                <Button 
                  className="w-full h-14 text-base font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all" 
                  onClick={() => setStatus("EN_ROUTE")}
                >
                  Start Journey
                </Button>
              )}
              
              {status === "EN_ROUTE" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="mb-6 flex flex-col items-center text-center rounded-2xl bg-warning/10 p-5 text-sm text-warning border border-warning/20">
                    <div className="h-3 w-3 rounded-full bg-warning animate-ping mb-2" />
                    <p className="font-semibold tracking-wide uppercase text-xs">Live Location Sharing Active</p>
                    <p className="text-muted-foreground mt-1">Customer can track your arrival</p>
                  </div>
                  <Button 
                    className="w-full h-14 text-base font-semibold rounded-2xl shadow-md hover:shadow-lg transition-all" 
                    onClick={() => setStatus("ARRIVED")}
                  >
                    Mark as Arrived
                  </Button>
                </motion.div>
              )}

              {status === "ARRIVED" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Button 
                    className="w-full h-14 text-base font-semibold rounded-2xl bg-success hover:bg-success/90 text-white shadow-md transition-all" 
                    onClick={() => setStatus("COMPLETED")}
                  >
                    Complete Job
                  </Button>
                </motion.div>
              )}

              {status === "COMPLETED" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-6 rounded-2xl bg-success/10 border border-success/20"
                >
                  <div className="h-12 w-12 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div className="text-success font-bold text-lg tracking-tight">Job Completed</div>
                  <p className="text-success/80 text-sm mt-1">Great work!</p>
                </motion.div>
              )}
            </div>

            <hr className="my-8 border-white/10" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center p-3 rounded-xl bg-background/50 border border-white/5">
                <span className="text-muted-foreground font-medium">Estimated Earnings</span>
                <span className="font-bold text-success text-base tracking-wide">₹1,499</span>
              </div>
              <div className="flex justify-between items-center px-3 py-2">
                <span className="text-muted-foreground">Payment Mode</span>
                <span className="font-medium">Online (Pre-paid)</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

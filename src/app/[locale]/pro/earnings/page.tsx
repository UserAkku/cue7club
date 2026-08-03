"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CurrencyInr, Wallet, Bank, TrendUp } from "@phosphor-icons/react";
import { motion } from "motion/react";

import { useTranslations } from "next-intl";

export default function EarningsPage() {
  const t = useTranslations("ProDashboard");
  const transactions = [
    { id: "TX-9938", type: "Payout", amount: "₹1,499", date: "Today, 11:30 AM", status: "Completed", icon: Wallet },
    { id: "TX-9937", type: "Payout", amount: "₹999", date: "Yesterday", status: "Completed", icon: Wallet },
    { id: "TX-9936", type: "Bank Transfer", amount: "-₹5,000", date: "Oct 12, 2023", status: "Settled", icon: Bank },
    { id: "TX-9935", type: "Payout", amount: "₹2,499", date: "Oct 11, 2023", status: "Completed", icon: Wallet },
  ];

  return (
    <div className="pb-12 max-w-4xl mx-auto">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="font-heading text-4xl font-bold tracking-tight mb-2">{t("earnings")}</h1>
          <p className="text-muted-foreground">Track your payouts, balances, and history.</p>
        </div>
        
        <Button size="lg" className="rounded-full px-8 shadow-sm">
          Withdraw Funds
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-8 border-black/5 bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 transition-colors rounded-3xl shadow-sm h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-primary font-medium">
              <CurrencyInr size={24} weight="duotone" />
              <span>Available Balance</span>
            </div>
            <h2 className="font-heading text-5xl font-bold tracking-tight mb-2">₹12,450</h2>
            <p className="text-sm text-muted-foreground">Ready to be withdrawn to your bank account.</p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="p-8 border-black/5 bg-white hover:bg-secondary/20 transition-colors rounded-3xl shadow-sm h-full flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-success font-medium">
              <TrendUp size={24} weight="duotone" />
              <span>Total Earnings (This Month)</span>
            </div>
            <h2 className="font-heading text-5xl font-bold tracking-tight mb-2">₹48,200</h2>
            <p className="text-sm text-muted-foreground">You are doing great this month!</p>
          </Card>
        </motion.div>
      </div>

      <div>
        <h2 className="font-heading text-2xl font-semibold tracking-tight mb-6">Recent Transactions</h2>
        <Card className="border-black/5 bg-white shadow-sm rounded-3xl overflow-hidden">
          <div className="divide-y divide-black/5">
            {transactions.map((tx, i) => {
              const Icon = tx.icon;
              const isDebit = tx.amount.startsWith("-");
              return (
                <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full \${isDebit ? 'bg-secondary' : 'bg-success/10 text-success'}`}>
                      <Icon size={24} weight={isDebit ? "regular" : "duotone"} />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-lg">{tx.type}</h4>
                      <p className="text-sm text-muted-foreground">{tx.date} • {tx.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-xl \${isDebit ? 'text-foreground' : 'text-success'}`}>
                      {tx.amount}
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{tx.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

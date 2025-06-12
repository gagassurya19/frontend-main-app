"use client"

import type * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Home, ScanLine, Calculator, HistoryIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ROUTES } from "@/constants"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
}

interface MenuBarProps {
  // Recipe navigation props (optional - only for result page)
  showRecipeNavButtons?: boolean;
  hasMultipleRecipes?: boolean;
  onScrollToRecipe?: (direction: 'left' | 'right') => void;
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" strokeWidth={2} />,
    label: "Home",
    href: ROUTES.HOME,
  },
  {
    icon: <ScanLine className="h-5 w-5" strokeWidth={2} />,
    label: "Snap",
    href: ROUTES.SNAP,
  },
  {
    icon: <HistoryIcon className="h-5 w-5" strokeWidth={2} />,
    label: "History",
    href: ROUTES.HISTORY,
  },
  {
    icon: <Calculator className="h-5 w-5" strokeWidth={2} />,
    label: "BMI",
    href: ROUTES.BMI,
  }
]

export function MenuBar({ 
  showRecipeNavButtons = false, 
  hasMultipleRecipes = false,
  onScrollToRecipe 
}: MenuBarProps = {}) {
  const { scrollY } = useScroll()
  const pathname = usePathname()
  const y = useTransform(scrollY, [0, 100], [0, -20])
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const isResultPage = pathname === '/snap/result'

  return (
    <motion.div
      className="fixed bottom-6 z-50 mx-4"
      style={{ y, opacity }}
    >
      <motion.nav
        className="p-2 rounded-2xl bg-background/80 backdrop-blur-lg border border-border/40 shadow-lg relative overflow-hidden"
        initial="initial"
      >
        <ul className="flex items-center gap-2 relative z-10">
          {/* Recipe Navigation - Left Button */}
          {isResultPage && showRecipeNavButtons && hasMultipleRecipes && onScrollToRecipe && (
            <motion.li className="relative">
              <button
                onClick={() => onScrollToRecipe('left')}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all duration-300 hover:scale-105 hover:border-amber-300"
              >
                <ChevronLeft className="h-4 w-4 text-amber-600" />
              </button>
            </motion.li>
          )}

          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <motion.li key={item.label} className="relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl group`}
                >
                  <span className={`transition-colors duration-300 ${isActive ? '[&>svg]:stroke-[2.5px]' : 'text-muted-foreground'}`}>
                    {item.icon}
                  </span>
                  <span 
                    className={`text-sm transition-[max-width,opacity,transform] duration-500 ease-in-out text-foreground font-medium group-hover:text-foreground opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[200px] overflow-hidden translate-x-[-10px] group-hover:translate-x-0 whitespace-nowrap`}
                  >
                    {item.label}
                  </span>
                </Link>
              </motion.li>
            )
          })}

          {/* Recipe Navigation - Right Button */}
          {isResultPage && showRecipeNavButtons && hasMultipleRecipes && onScrollToRecipe && (
            <motion.li className="relative">
              <button
                onClick={() => onScrollToRecipe('right')}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all duration-300 hover:scale-105 hover:border-amber-300"
              >
                <ChevronRight className="h-4 w-4 text-amber-600" />
              </button>
            </motion.li>
          )}
        </ul>
      </motion.nav>
    </motion.div>
  )
}

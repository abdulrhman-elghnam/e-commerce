import { FiHeadphones, FiRefreshCw, FiShield, FiTruck } from "react-icons/fi"

const infoItems = [
    {
        title: "Free Shipping",
        description: "On orders over 500 EGP",
        icon: FiTruck,
        
    },
    {
        title: "Secure Payment",
        description: "100% secure transactions",
        icon: FiShield,
        
    },
    {
        title: "Easy Returns",
        description: "14-day return policy",
        icon: FiRefreshCw,
        
    },
    {
        title: "24/7 Support",
        description: "Dedicated support team",
        icon: FiHeadphones,
        
    },
]

export default function HomeInformation() {
    return (
        <section className="w-full bg-[#F9FAFB] py-8">
            <div className="app-container">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {infoItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <div
                                key={item.title}
                                className="flex h-20 items-center gap-4 rounded-xl bg-white p-4 shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
                            >
                                <span className={`flex size-12 items-center justify-center rounded-full border`}>
                                    <Icon className={`size-5 `} />
                                </span>
                                <div>
                                    <h3 className="text-sm font-semibold text-[#1E2939]">{item.title}</h3>
                                    <p className="text-xs font-medium text-[#6A7282]">{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

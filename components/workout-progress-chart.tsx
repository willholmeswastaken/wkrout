"use client"

export function WorkoutProgressChart() {
  // Mock data for the chart
  const data = [
    { name: "Week 1", volume: 2400 },
    { name: "Week 2", volume: 3000 },
    { name: "Week 3", volume: 2800 },
    { name: "Week 4", volume: 3500 },
    { name: "Week 5", volume: 3200 },
    { name: "Week 6", volume: 4000 },
    { name: "Week 7", volume: 4200 },
    { name: "Week 8", volume: 4500 },
  ]

  // Calculate max volume for scaling
  const maxVolume = Math.max(...data.map((item) => item.volume))

  return (
    <div className="h-64 w-full">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>0</span>
        <span>{maxVolume} kg</span>
      </div>

      {/* Chart container with grid background */}
      <div className="h-52 bg-secondary/30 rounded-md p-4 relative">
        {/* Horizontal grid lines */}
        <div className="absolute inset-x-0 top-1/4 border-t border-gray-700/50"></div>
        <div className="absolute inset-x-0 top-1/2 border-t border-gray-700/50"></div>
        <div className="absolute inset-x-0 top-3/4 border-t border-gray-700/50"></div>

        {/* Bars container */}
        <div className="flex h-full items-end justify-between gap-1">
          {data.map((item, index) => {
            const heightPercent = (item.volume / maxVolume) * 100
            return (
              <div
                key={index}
                className="group relative flex flex-col items-center"
                style={{ width: `${100 / data.length}%` }}
              >
                {/* The actual bar */}
                <div
                  className="w-full bg-orange-500 rounded-t-sm transition-all duration-200 hover:bg-orange-400"
                  style={{ height: `${heightPercent}%`, minHeight: "4px" }}
                ></div>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 bg-background border border-border rounded px-2 py-1 text-xs pointer-events-none transition-opacity">
                  {item.volume} kg
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-center" style={{ width: `${100 / data.length}%` }}>
            {item.name.replace("Week ", "W")}
          </div>
        ))}
      </div>
    </div>
  )
}

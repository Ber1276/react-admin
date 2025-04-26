import { RefObject, useEffect, useRef, useState } from "react"
import * as echarts from 'echarts'
export const useCharts = ():[RefObject<HTMLDivElement|null>,echarts.EChartsType|undefined] => {
    const chartRef = useRef<HTMLDivElement>(null)
    const [instance, setInstance] = useState<echarts.EChartsType>()
    useEffect(() => {
        if (chartRef.current) {
            const instance = echarts.init(chartRef.current)
            setInstance(instance)
        }
    }, [])

    return [ chartRef, instance ]
}
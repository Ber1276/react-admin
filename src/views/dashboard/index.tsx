import { Button, Card, Descriptions } from 'antd';
import styles from './index.module.less'
import { useEffect, useState } from 'react';
import api from '../../api';
import { useStore } from '../../store';
import { ILineData, IRadarData, IReportData } from '../../types/api';
import { useCharts } from '../../hooks/useCharts';
export default function DashBoard() {
    const [lineRef,lineChart]=useCharts()
    const [pieRefleft,pieChart1]=useCharts()
    const [pieRefright,pieChart2]=useCharts()
    const [radarRef,radarChart]=useCharts()

    const {userInfo}=useStore()
    useEffect(()=>{
        getReportData()
    },[])
    useEffect(()=>{
        getLineData(),
        getPieData1(),
        getPieData2(),
        getRadarData()
    },[lineChart,pieChart1,pieChart2,radarChart])
    const [reportData,setReportData]=useState<IReportData>()
    const getReportData=async()=>{
        const data=await api.getReportData()
        setReportData(data as unknown as IReportData)
    }
    const getLineData=async ()=>{
        const data=await api.getLineData() as unknown as ILineData
        if(lineChart){
            lineChart.setOption({
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['收入', '支出']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                },
                xAxis: {
                    data:data.label
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '订单',
                        type: 'line',
                        data:data.order
                    },
                    {
                        name: '流水',
                        type: 'line',
                        data:data.money
                    }
                ]
            })
        }
    }
    const getPieData1=async()=>{
        const data=await api.getPieCityData()
        if(pieChart1){
            pieChart1.setOption({
                title:{
                    text:'城市分布',
                    left:'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '城市',
                        type: 'pie',
                        radius: '50%',
                        data:data,
                    },
                ]
            })
        }
    }
    const getPieData2=async ()=>{ 
        const data=await api.getPieAgeData()
        if(pieChart2){
            pieChart2.setOption({
                title:{
                    text:'年龄分布',
                    left:'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient:'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '年龄',
                        type: 'pie',
                        radius: [50,100],
                        roseType: 'area',
                        data:data,
                    }
                ]
            })
        }
    }
    const getRadarData=async()=>{
        const data=await api.getRadarData() as unknown as IRadarData
        if(radarChart){
            radarChart.setOption({
                title:{
                    text:'能力雷达图',
                    left:'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient:'vertical',
                    left: 'left'
                },
                radar: {
                    indicator: data.indicator
                },
                series: [
                    {
                        name: '能力值',
                        type: 'radar',
                        data: data.data
                    }
                ]
            })
        }
    }
    const renderLineChart = () => {
        getLineData()
    }
    const renderPieChart = () => {
        getPieData1()
        getPieData2()
    }
    const renderRadarChart = () => {
        getRadarData()
    }

    return <div className={styles.dashboard}>
        <div className={styles.userInfo}>
            <img src={userInfo.userImg} alt="" className={styles.userImg} />
            <Descriptions title="用户信息" >
                <Descriptions.Item label="用户名">{userInfo.userName}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{userInfo.userEmail}</Descriptions.Item>
                <Descriptions.Item label="手机号">{userInfo.mobile}</Descriptions.Item>
                <Descriptions.Item label="角色">{userInfo.role}</Descriptions.Item>
                <Descriptions.Item label="状态">{userInfo.state}</Descriptions.Item>
            </Descriptions>
        </div>
        <div className={styles.report}>
            <div className={styles.card}>
                 <div className={styles.title}>提交代码量</div>
                 <div className={styles.content}>{reportData?.codeline}</div>
            </div>
            <div className={styles.card}>
                 <div className={styles.title}>工资</div>
                 <div className={styles.content}>{reportData?.salary}</div>
            </div>
            <div className={styles.card}>
                 <div className={styles.title}>需求量</div>
                 <div className={styles.content}>{reportData?.icafecount}</div>
            </div>
            <div className={styles.card}>
                 <div className={styles.title}>项目行数</div>
                 <div className={styles.content}>{reportData?.projectNum}</div>
            </div>
        </div>
        <div className={styles.chart}>
            <Card title="top5" extra={<Button onClick={renderLineChart}>刷新</Button>}>
                <div ref={lineRef} className={styles.lineChart}></div>
            </Card>
        </div>
        <div className={styles.chart}>
            <Card title="lius" extra={<Button onClick={renderPieChart}>刷新</Button>}>
                <div className={styles.pieChart}>
                <div ref={pieRefleft} className={styles.pieItem}></div>
                <div ref={pieRefright} className={styles.pieItem}></div>
                </div>
            </Card>
        </div>
        <div className={styles.chart}>
            <Card title="222" extra={<Button onClick={renderRadarChart}>刷新</Button>}>
                <div ref={radarRef} className={styles.radarChart}></div>
            </Card>
        </div>
    </div>;
}

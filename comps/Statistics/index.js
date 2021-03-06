import React, { useEffect } from 'react';
import { Line, Pie } from '@antv/g2plot';
import { last } from '@antv/util';


export const Statistics = () => {
    useEffect(() => {
        const divStyles = {
            position: 'absolute',
            background: 'rgba(255,255,255,0.95)',
            boxShadow: 'rgb(174, 174, 174) 0px 0px 10px',
            borderRadius: '4px',
        };

        const setStyles = (container, styles) => {
            // eslint-disable-next-line guard-for-in
            for (const key in styles)
                // eslint-disable-next-line no-param-reassign
                container.style[key] = styles[key];
        };

        fetch('/data/mult.json')
            .then(data => data.json())
            .then(data =>
                data.filter(d => ['Влад', 'Алексей', 'Анатолий', 'Кирилл', 'Даниил'].includes(d.country)))
            .then(data => {
                const line = new Line('container', {
                    padding: 'auto',
                    appendPadding: [8, 10, 0, 10],
                    data,
                    xField: 'year',
                    yField: 'value',
                    seriesField: 'country',
                    smooth: true,
                    lineStyle: ({ country }) => {
                        const importantCountries = ['United States', 'France', 'Germany'];
                        const idx = importantCountries.indexOf(country);
                        return { lineWidth: idx !== -1 ? 2 : 1 };
                    },
                    interactions: [{ type: 'brush' }],
                    tooltip: {
                        follow: true,
                        enterable: true,
                        offset: 18,
                        shared: true,
                        marker: { lineWidth: 0.5, r: 3 },
                    },
                });

                line.render();

                const createPie = (container, data) => {
                    const piePlot = new Pie(container, {
                        data,
                        width: 120,
                        height: 120,
                        appendPadding: 10,
                        autoFit: false,
                        angleField: 'value',
                        colorField: 'type',
                        legend: false,
                        tooltip: false,
                        animation: false,
                        color: line.chart?.themeObject.colors10,
                        label: {
                            type: 'inner',
                            offset: '-10%',
                            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
                        },
                    });
                    piePlot.render();
                };
                line.update({
                    tooltip: {
                        customContent: (value, items) => {
                            const pieData = items.map(item => ({
                                type: item.name,
                                value: Number(item.value),
                            }));
                            const container = document.createElement('div');
                            const pieContainer = document.createElement('div');
                            setStyles(container, divStyles);
                            createPie(pieContainer, pieData);
                            container.appendChild(pieContainer);
                            return container;
                        },
                    },
                });
                // 初始化，默认激活
                const point = line.chart.getXY(last(data.filter(d => !!d.value)));
                line.chart.showTooltip(point);
            });
    }, []);


    return (
        <>
            <div id='container'>
                <div id='container1' />
                <div id='container2' />
            </div>
        </>
    );
};

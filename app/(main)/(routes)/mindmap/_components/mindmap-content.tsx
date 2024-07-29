import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface MindMapProps {
  data?: { name: string; children?: any[] };
}

const jsonData = {
  name: "Root",
  children: [
    {
      name: "Child 1",
      children: [
        {
          name: "Grandchild 1",
          children: [
            {
              name: "Grandchild 11",
            },
            { name: "Grandchild 2" },
          ],
        },
        { name: "Grandchild 2" },
      ],
    },
    { name: "Child 2" },
  ],
};

const MindMap: React.FC<MindMapProps> = ({ data = jsonData }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom;

    const root = d3.hierarchy(data);

    // 调整这个 tree 布局的 size 参数来缩短“箭头线”长度
    const treeLayout = d3.tree().size([height, width / 3]);
    const links = treeLayout(root as any).links();
    const nodes = root.descendants();

    // 清空之前的内容
    svg.selectAll("*").remove();

    // 创建缩放行为
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    // 创建一个 g 元素作为所有内容的容器
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const linkGroup = g.append("g").attr("class", "links");
    linkGroup
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", (d) => d.source.y)
      .attr("y1", (d) => d.source.x)
      .attr("x2", (d) => d.target.y)
      .attr("y2", (d) => d.target.x)
      .attr("stroke", "#ccc");

    const nodeGroup = g.append("g").attr("class", "nodes");
    const node = nodeGroup
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.append("circle").attr("r", 5).attr("fill", "#69b3a2");

    node
      .append("text")
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .text((d) => d.data.name);
  }, [data]);

  return <svg ref={svgRef} width="100%" height="100vh" />;
};

export default MindMap;

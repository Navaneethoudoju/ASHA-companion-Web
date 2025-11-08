import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Jul", pregnancies: 3, immunizations: 12 },
  { month: "Aug", pregnancies: 5, immunizations: 15 },
  { month: "Sep", pregnancies: 4, immunizations: 18 },
  { month: "Oct", pregnancies: 6, immunizations: 14 },
  { month: "Nov", pregnancies: 2, immunizations: 16 }
];

const immunizationData = [
  { name: "Completed", value: 65 },
  { name: "Pending", value: 35 }
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted))"];

const Analytics = () => {
  return (
    <Layout role="ANM">
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Health Analytics</h1>
          <p className="text-muted-foreground">Visual insights of health data trends</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="pregnancies" fill="hsl(var(--primary))" />
                  <Bar dataKey="immunizations" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Immunization Status</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={immunizationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {immunizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;

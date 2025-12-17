import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import HealthMetrics from "./HealthMetrics";

const defaultData = [
  { month: "Oct", systolic: 120, diastolic: 80 },
  { month: "Nov", systolic: 115, diastolic: 65 },
  { month: "Dec", systolic: 155, diastolic: 95 },
  { month: "Jan", systolic: 110, diastolic: 85 },
  { month: "Feb", systolic: 145, diastolic: 70 },
  { month: "Mar", systolic: 125, diastolic: 75 },
];

export default function DiagnosisChart({ patientData }) {
  // Transform diagnosis history from API into chart data
  const chartData = patientData?.diagnosis_history?.map(record => ({
    month: new Date(`${record.year}-${record.month}`).toLocaleDateString('en-US', { month: 'short' }),
    systolic: record.blood_pressure?.systolic?.value || record.blood_pressure?.systolic || 0,
    diastolic: record.blood_pressure?.diastolic?.value || record.blood_pressure?.diastolic || 0
  })) || defaultData;

  // Get the most recent blood pressure reading
  const latestReading = chartData[chartData.length - 1] || { systolic: 160, diastolic: 78 };
  
  const getSystolicStatus = (value) => {
    if (value >= 140) return 'Higher than Average';
    if (value >= 120) return 'Elevated';
    return 'Normal';
  };

  const getDiastolicStatus = (value) => {
    if (value >= 90) return 'Higher than Average';
    if (value >= 80) return 'Elevated';
    return 'Normal';
  };
  return (
    <div className="bg-white p-4 rounded-xl shadow" style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', border: '1px solid #E5E7EB' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#1F2937' }}>Diagnosis History</h2>

      <div style={{
        backgroundColor: '#F3E8FF',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '16px'
        }}>
          <div>
            <h3 style={{
              fontSize: '14px',
              color: '#1E293B',
              fontWeight: '600',
              margin: '0 0 12px 0'
            }}>
              Blood Pressure
            </h3>
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#EC4899',
                  fontWeight: '600'
                }}>●</span>
                <span style={{
                  fontSize: '12px',
                  color: '#6B7280'
                }}>Systolic</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#8B5CF6',
                  fontWeight: '600'
                }}>●</span>
                <span style={{
                  fontSize: '12px',
                  color: '#6B7280'
                }}>Diastolic</span>
              </div>
              <select style={{
                marginLeft: 'auto',
                padding: '4px 8px',
                fontSize: '12px',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}>
                <option>Last 6 months</option>
              </select>
            </div>
          </div>

          <div style={{
            textAlign: 'right'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#EC4899'
                  }}>{latestReading.systolic}</span>
                  <span style={{
                    fontSize: '12px',
                    color: '#6B7280'
                  }}>Systolic</span>
                </div>
                <p style={{
                  fontSize: '11px',
                  color: '#6B7280',
                  margin: '4px 0 0 0'
                }}>{getSystolicStatus(latestReading.systolic)}</p>
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  justifyContent: 'flex-end'
                }}>
                  <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#8B5CF6'
                  }}>{latestReading.diastolic}</span>
                  <span style={{
                    fontSize: '12px',
                    color: '#6B7280'
                  }}>Diastolic</span>
                </div>
                <p style={{
                  fontSize: '11px',
                  color: '#6B7280',
                  margin: '4px 0 0 0'
                }}>{getDiastolicStatus(latestReading.diastolic)}</p>
              </div>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 10 }}>
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              domain={[0, 180]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "#fff",
                border: "2px solid #EC4899",
                borderRadius: "8px",
                padding: '8px 12px'
              }}
              formatter={(value) => `${value}`}
              labelStyle={{ color: '#000' }}
            />
            <Line 
              type="monotone" 
              dataKey="systolic" 
              stroke="#ec4899" 
              strokeWidth={2}
              dot={{ fill: "#ec4899", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="diastolic" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              dot={{ fill: "#8b5cf6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <HealthMetrics patientData={patientData} />
    </div>
  );
}

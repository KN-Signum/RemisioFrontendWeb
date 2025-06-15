// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getSymptomsByPatientId } from '../api/get-patient-symptoms';
// import { SymptomDto } from '../types';

// interface SymptomsListProps {
//   patientId: string;
// }

// export const SymptomsList: React.FC<SymptomsListProps> = ({ patientId }) => {
//   const {
//     data: symptoms,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['symptoms', patientId],
//     queryFn: () => getSymptomsByPatientId(patientId),
//   });

//   if (isLoading) return <div>Loading symptoms...</div>;
//   if (error) return <div>Error loading symptoms</div>;
//   if (!symptoms || symptoms.length === 0)
//     return <div>No symptoms recorded</div>;

//   // Helper function to format date
//   const formatDate = (dateString: string | undefined) => {
//     if (!dateString) return '-';
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   // Helper function to render pain level with appropriate color
//   const renderPainLevel = (level: string) => {
//     const colorMap: Record<string, string> = {
//       None: 'bg-gray-100 text-gray-800',
//       Mild: 'bg-green-100 text-green-800',
//       Moderate: 'bg-yellow-100 text-yellow-800',
//       Severe: 'bg-orange-100 text-orange-800',
//       'Very Severe': 'bg-red-100 text-red-800',
//     };

//     const colorClass = colorMap[level] || 'bg-gray-100 text-gray-800';

//     return (
//       <span className={`rounded px-2 py-1 text-xs font-medium ${colorClass}`}>
//         {level}
//       </span>
//     );
//   };

//   // Sort symptoms by date, most recent first
//   const sortedSymptoms = [...symptoms].sort((a, b) => {
//     const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
//     const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
//     return dateB - dateA;
//   });

//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-medium">Symptoms History</h3>
//       <div className="ring-opacity-5 mt-2 overflow-hidden shadow ring-1 ring-black sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
//               >
//                 Date
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//               >
//                 Type
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//               >
//                 Duration
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//               >
//                 Pain Level
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//               >
//                 Description
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {sortedSymptoms.map((symptom: SymptomDto) => (
//               <tr key={symptom.id}>
//                 <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
//                   {formatDate(symptom.created_at)}
//                 </td>
//                 <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
//                   {symptom.symptom_type || '-'}
//                 </td>
//                 <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
//                   {symptom.duration || '-'}
//                 </td>
//                 <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
//                   {symptom.pain_level
//                     ? renderPainLevel(symptom.pain_level)
//                     : '-'}
//                 </td>
//                 <td className="px-3 py-4 text-sm text-gray-500">
//                   {symptom.symptom_description || '-'}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye } from 'lucide-react';

interface ReservationsTabProps {
  reservations: any[];
}

const ReservationsTab: React.FC<ReservationsTabProps> = ({ reservations }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reservations</CardTitle>
        <CardDescription>Manage upcoming reservations and bookings</CardDescription>
      </CardHeader>
      <CardContent>
        {reservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Time</th>
                  <th className="text-left py-2">Guests</th>
                  <th className="text-left py-2">Phone</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Message</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{res.name}</td>
                    <td className="py-2">{new Date(res.date).toLocaleDateString()}</td>
                    <td className="py-2">{res.time}</td>
                    <td className="py-2">{res.guests}</td>
                    <td className="py-2">{res.phone}</td>
                    <td className="py-2">{res.email || '-'}</td>
                    <td className="py-2 max-w-[200px] truncate">{res.message || '-'}</td>
                    <td className="py-2">
                      <Button variant="outline" size="sm">
                        <Eye size={16} className="mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No reservations found. Reservations will appear here when customers make bookings.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ReservationsTab;

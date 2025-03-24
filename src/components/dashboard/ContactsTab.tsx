
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from 'lucide-react';

interface ContactsTabProps {
  contacts: any[];
}

const ContactsTab: React.FC<ContactsTabProps> = ({ contacts }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Submissions</CardTitle>
        <CardDescription>View messages from customers</CardDescription>
      </CardHeader>
      <CardContent>
        {contacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Email</th>
                  <th className="text-left py-2">Phone</th>
                  <th className="text-left py-2">Message</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{contact.name}</td>
                    <td className="py-2">{contact.email || '-'}</td>
                    <td className="py-2">{contact.phone}</td>
                    <td className="py-2 max-w-xs truncate">{contact.message}</td>
                    <td className="py-2">
                      {contact.created_at 
                        ? new Date(contact.created_at).toLocaleDateString()
                        : '-'
                      }
                    </td>
                    <td className="py-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye size={16} className="mr-1" /> View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Contact Message</DialogTitle>
                            <DialogDescription>
                              Received on {contact.created_at 
                                ? new Date(contact.created_at).toLocaleString()
                                : 'Unknown date'
                              }
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-x-4">
                              <Label className="text-right font-medium">Name:</Label>
                              <div className="col-span-3">{contact.name}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-x-4">
                              <Label className="text-right font-medium">Email:</Label>
                              <div className="col-span-3">{contact.email || '-'}</div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-x-4">
                              <Label className="text-right font-medium">Phone:</Label>
                              <div className="col-span-3">{contact.phone}</div>
                            </div>
                            <div className="grid grid-cols-4 gap-x-4">
                              <Label className="text-right font-medium">Message:</Label>
                              <div className="col-span-3 whitespace-pre-wrap">{contact.message}</div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No contact submissions found. They will appear here when customers submit the contact form.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactsTab;

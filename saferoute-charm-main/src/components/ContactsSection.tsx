import { Users, Plus, Phone, Mail, Edit2, Trash2, Heart, UserCheck } from "lucide-react";
import { useState } from "react";

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  relation: string;
}

const initialContacts: Contact[] = [
  { id: 1, name: "Mom", phone: "+91 98765 43210", email: "mom@email.com", relation: "Mother" },
  { id: 2, name: "Best Friend - Priya", phone: "+91 87654 32109", email: "priya@email.com", relation: "Friend" },
  { id: 3, name: "Brother - Rahul", phone: "+91 76543 21098", email: "rahul@email.com", relation: "Brother" },
];

const ContactsSection = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", email: "", relation: "" });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([
        ...contacts,
        { ...newContact, id: Date.now() },
      ]);
      setNewContact({ name: "", phone: "", email: "", relation: "" });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <section className="min-h-screen py-20 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trusted Circle</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your <span className="gradient-text">Safety Network</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Add people you trust. They'll be notified instantly in case of emergency 
            and can track your location during your journeys.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Add Contact Button */}
          <div className="flex justify-center mb-8 animate-fade-up">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn-3d inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Trusted Contact
            </button>
          </div>

          {/* Add Contact Form */}
          {showAddForm && (
            <div className="card-3d p-6 rounded-2xl mb-8 animate-slide-up">
              <h3 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Add New Contact
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Name</label>
                  <input
                    type="text"
                    placeholder="Contact name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    className="input-3d"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Relation</label>
                  <input
                    type="text"
                    placeholder="e.g., Mother, Friend"
                    value={newContact.relation}
                    onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                    className="input-3d"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                    className="input-3d"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    className="input-3d"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleAddContact} className="btn-3d flex-1">
                  Save Contact
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 rounded-xl font-semibold text-muted-foreground bg-muted hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Contacts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact, i) => (
              <div
                key={contact.id}
                className="card-3d p-6 rounded-2xl group animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Avatar */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-display font-semibold text-lg text-foreground">{contact.name}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                      {contact.relation}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {contact.phone}
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {contact.email}
                    </a>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium text-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Call Now
                  </a>
                  <button className="flex-1 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                    Share Location
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {contacts.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No contacts added yet</p>
              <p className="text-sm text-muted-foreground/70">Add your first trusted contact above</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;

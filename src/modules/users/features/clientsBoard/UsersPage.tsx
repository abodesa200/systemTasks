"use client";

import { DeleteDialog } from "@/components/shared/DeleteDialog";
import { useState } from "react";
import { UserCard } from "../../components/UserCard";
import { UserDialog } from "../../components/UserDialog";
import { UserFilters } from "../../components/UserFilters";
import { UserStats } from "../../components/UserStats";
import { UserTable } from "../../components/UserTable";
import { useUsers } from "../../hooks/useUsers";
import {
  Client,
  ClientFormValues,
  User,
  UserFormValues,
  UserType,
} from "../../types/usersType";

interface ClientsBoardProps {
  initialClients: Client[] | UserType[];
  type: "CLIENTS" | "USERS";
}

export const UsersPage = ({ initialClients, type }: ClientsBoardProps) => {
  const {
    data,
    setData,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    viewMode,
    setViewMode,
    stats,
    filtered,
  } = useUsers(initialClients, type);
  const [editingClient, setEditingClient] = useState<UserType | null>(null);
  const [deletingClient, setDeletingClient] = useState<UserType | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // ------------------- Handlers -------------------
  const handleAddClick = () => {
    setEditingClient(null);
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (client: UserType) => {
    setEditingClient(client);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (client: UserType) => {
    setDeletingClient(client);
    setIsDeleteDialogOpen(true);
  };

  const handleAddClient = (clientData: ClientFormValues | UserFormValues) => {
    if (type === "CLIENTS") {
      const newClient: Client = {
        id: (data.length + 1).toString(),
        ...(clientData as ClientFormValues),
        totalSpent: 0,
        lastPurchase: "",
      };
      setData([...data, newClient]);
    } else {
      const newUser: User = {
        id: (data.length + 1).toString(),
        ...(clientData as UserFormValues),
        lastActive: new Date().toISOString(),
        role: (clientData as UserFormValues).role, // ضروري يتحدد
        department: (clientData as UserFormValues).department,
        location: (clientData as UserFormValues).location,
      };
      setData([...data, newUser]);
    }
  };

  const handleEditClient = (clientData: ClientFormValues | UserFormValues) => {
    if (!editingClient) return;

    const updated = data.map((client) =>
      client.id === editingClient.id ? { ...client, ...clientData } : client
    );

    setData(updated);
  };

  const handleDeleteClient = () => {
    if (!deletingClient) return;

    const updated = data.filter((client) => client.id !== deletingClient.id);
    setData(updated);
    setIsDeleteDialogOpen(false);
    setDeletingClient(null);
  };

  return (
    <div className="">
      <div className=" space-y-8">
        <UserStats stats={stats} />
        <UserFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          filterStatus={filterStatus}
          onFilterStatusChange={setFilterStatus}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          type={type}
        />

        {viewMode === "table" ? (
          <UserTable
            clients={filtered}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onAdd={handleAddClick}
            type={type}
            handleAddClick={handleAddClick}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((client) => (
              <UserCard
                key={client.id}
                client={client}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                type={type}
              />
            ))}
          </div>
        )}

        <UserDialog
          client={null}
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSave={handleAddClient}
          isEditing={false}
          type={type}
        />

        <UserDialog
          client={editingClient}
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setEditingClient(null);
          }}
          onSave={handleEditClient}
          isEditing={true}
          type={type}
        />

        <DeleteDialog
          open={isDeleteDialogOpen}
          onOpenChange={() => {
            setIsDeleteDialogOpen(false);
            setDeletingClient(null);
          }}
          onConfirm={handleDeleteClient}
          // name={deletingClient?.name || ""}
          // type={type === "CLIENTS" ? "عميل" : "مستخدم"}
        />
      </div>
    </div>
  );
};

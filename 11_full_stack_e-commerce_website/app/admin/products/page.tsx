// app/admin/products/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "../../lib/store";
import { Product } from "../../lib/types";
import { CATEGORIES } from "../../lib/data";
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  ArrowLeft,
  Star,
  RefreshCw,
} from "lucide-react";

const EMPTY = {
  name: "",
  slug: "",
  price: 0,
  category: "Espresso",
  description: "",
  image: "",
  stock: 0,
  featured: false,
  tags: [] as string[],
};

export default function AdminProductsPage() {
  const {
    user,
    products,
    productsLoading,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useStore();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [imgPreview, setImgPreview] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/login");
      return;
    }
    fetchProducts();
  }, [user]);

  if (!user || user.role !== "admin") return null;

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY });
    setImgPreview("");
    setTagInput("");
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      slug: p.slug,
      price: p.price,
      category: p.category,
      description: p.description,
      image: p.image,
      stock: p.stock,
      featured: p.featured,
      tags: [...p.tags],
    });
    setImgPreview(p.image);
    setTagInput("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setImgPreview("");
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setImgPreview(url);
      setForm((f) => ({ ...f, image: url }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.image) {
      alert("Name, price, and image are required.");
      return;
    }
    setSaving(true);
    let ok = false;
    if (editing) {
      ok = await updateProduct({
        ...editing,
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
    } else {
      ok = await addProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
    }
    setSaving(false);
    if (ok) closeForm();
  };

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    await deleteProduct(p.id);
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !form.tags.includes(t))
      setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="btn-ghost flex items-center gap-1.5 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <div>
            <h1 className="section-title mb-0">Products</h1>
            <p className="text-vault-muted text-sm">
              {products.length} products in database
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchProducts}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <RefreshCw
              className={`w-4 h-4 ${productsLoading ? "animate-spin" : ""}`}
            />{" "}
            Refresh
          </button>
          <button
            onClick={openAdd}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field max-w-sm"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {productsLoading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-8 h-8 text-coffee-400 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-vault-border bg-vault-dark/50">
                  {[
                    "Image",
                    "Name",
                    "Category",
                    "Price",
                    "Stock",
                    "Rating",
                    "Featured",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold text-vault-muted uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-vault-border">
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-vault-dark/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-vault-dark">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-vault-light text-sm">
                        {p.name}
                      </p>
                      <p className="text-xs text-vault-muted mt-0.5">
                        {p.slug}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-vault-muted whitespace-nowrap">
                      {p.category}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-coffee-400 whitespace-nowrap">
                      Rs {p.price}
                    </td>
                    <td className="px-4 py-3 text-sm text-vault-muted">
                      {p.stock}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-coffee-400 text-coffee-400" />
                        <span className="text-sm text-vault-light">
                          {p.rating}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`badge text-xs border ${p.featured ? "text-coffee-400 bg-coffee-900/20 border-coffee-700/30" : "text-vault-muted bg-vault-dark border-vault-border"}`}
                      >
                        {p.featured ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg hover:bg-vault-dark border border-vault-border hover:border-coffee-500 text-vault-muted hover:text-coffee-400 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-1.5 rounded-lg hover:bg-vault-dark border border-vault-border hover:border-red-500 text-vault-muted hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-16 text-vault-muted text-sm">
                No products found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Slide-over form */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeForm}
          />
          <div className="relative ml-auto w-full max-w-lg bg-vault-card border-l border-vault-border h-full overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-vault-border flex items-center justify-between sticky top-0 bg-vault-card z-10">
              <h2 className="font-display font-bold text-vault-light text-xl">
                {editing ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={closeForm}
                className="text-vault-muted hover:text-vault-light"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-vault-muted mb-2">
                  Product Image *
                </label>
                {imgPreview && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-vault-dark mb-3">
                    <Image
                      src={imgPreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="480px"
                    />
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-vault-border hover:border-coffee-500 rounded-xl py-4 text-sm text-vault-muted hover:text-coffee-400 transition-colors mb-2"
                >
                  <Upload className="w-4 h-4" /> Upload from computer
                </button>
                <input
                  className="input-field text-sm"
                  placeholder="Or paste image URL: https://..."
                  defaultValue={
                    editing?.image.startsWith("http") ? editing.image : ""
                  }
                  onBlur={(e) => {
                    if (e.target.value) {
                      setImgPreview(e.target.value);
                      setForm((f) => ({ ...f, image: e.target.value }));
                    }
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vault-muted mb-2">
                  Product Name *
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="e.g. Hazelnut Mocha"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vault-muted mb-2">
                  URL Slug{" "}
                  <span className="text-xs font-normal">
                    (auto-generated if empty)
                  </span>
                </label>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, slug: e.target.value }))
                  }
                  placeholder="hazelnut-mocha"
                  className="input-field"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vault-muted mb-2">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="input-field cursor-pointer"
                  >
                    {CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-vault-muted mb-2">
                    Price (Rs) *
                  </label>
                  <input
                    type="number"
                    value={form.price || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: Number(e.target.value) }))
                    }
                    placeholder="420"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-vault-muted mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={form.stock || ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, stock: Number(e.target.value) }))
                    }
                    placeholder="25"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-vault-muted mb-2">
                    Featured?
                  </label>
                  <div className="flex items-center gap-3 h-[46px]">
                    <button
                      onClick={() =>
                        setForm((f) => ({ ...f, featured: !f.featured }))
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${form.featured ? "bg-coffee-600" : "bg-vault-border"}`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? "translate-x-6" : "translate-x-0.5"}`}
                      />
                    </button>
                    <span className="text-sm text-vault-muted">
                      {form.featured ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-vault-muted mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={3}
                  placeholder="Describe the drink..."
                  className="input-field resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-vault-muted mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge bg-coffee-900/30 border border-coffee-700/30 text-coffee-400 gap-1.5 text-xs"
                    >
                      {tag}
                      <button
                        onClick={() =>
                          setForm((f) => ({
                            ...f,
                            tags: f.tags.filter((t) => t !== tag),
                          }))
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    placeholder="Add tag..."
                    className="input-field text-sm flex-1"
                  />
                  <button
                    onClick={addTag}
                    className="btn-secondary px-4 text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary flex-1 py-3 disabled:opacity-70"
                >
                  {saving ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : editing ? (
                    "Save Changes"
                  ) : (
                    "Add Product"
                  )}
                </button>
                <button onClick={closeForm} className="btn-secondary px-6">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

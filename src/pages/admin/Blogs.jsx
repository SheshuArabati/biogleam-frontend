import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { createPortal } from 'react-dom';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, getCurrentUser } from '../../lib/api';
import ImageUpload from '../../components/ImageUpload';

export default function AdminBlogs() {
  const [page, setPage] = useState(1);
  const [editingPost, setEditingPost] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [authorId, setAuthorId] = useState(null);
  const queryClient = useQueryClient();
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (editingPost || isCreating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editingPost, isCreating]);

  const { data: userData } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  useEffect(() => {
    if (userData?.user) {
      setAuthorId(userData.user.id);
    }
  }, [userData]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (editingPost || isCreating) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [editingPost, isCreating]);

  const { data, isLoading } = useQuery({
    queryKey: ['blogPosts', page],
    queryFn: () => getBlogPosts(),
  });

  const posts = data || [];

  const createMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      setIsCreating(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateBlogPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      setEditingPost(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteMutation.mutate(id);
    }
  };

  const PostForm = ({ post, onClose }) => {
    const handleImageUpload = (url) => {
      setFeaturedImageUrl(url);
      const contentTextarea = document.querySelector('textarea[name="content"]');
      if (contentTextarea) {
        const cursorPos = contentTextarea.selectionStart;
        const textBefore = contentTextarea.value.substring(0, cursorPos);
        const textAfter = contentTextarea.value.substring(cursorPos);
        const imageTag = `<img src="${url}" alt="Featured image" style="max-width: 100%; height: auto;" />`;
        contentTextarea.value = textBefore + imageTag + textAfter;
        contentTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    };

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const tagsStr = formData.get('tags');
          const data = {
            slug: formData.get('slug'),
            title: formData.get('title'),
            summary: formData.get('summary') || undefined,
            content: formData.get('content') || undefined,
            authorId: authorId?.toString(),
            tags: tagsStr ? tagsStr.split(',').map(s => s.trim()) : undefined,
            publishedAt: formData.get('publishedAt') || undefined,
          };

          if (post.id) {
            updateMutation.mutate({ id: post.id, data });
          } else {
            createMutation.mutate(data);
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Slug *</label>
          <input type="text" name="slug" defaultValue={post.slug} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Title *</label>
          <input type="text" name="title" defaultValue={post.title} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Summary</label>
          <textarea name="summary" defaultValue={post.summary} rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Featured Image</label>
          <ImageUpload
            onUpload={handleImageUpload}
          />
          {featuredImageUrl && (
            <div className="mt-2">
              <img src={featuredImageUrl} alt="Featured" className="max-w-xs h-auto rounded-lg border-2 border-gray-200" />
              <p className="text-xs text-gray-500 mt-1">Image URL: {featuredImageUrl}</p>
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Content (HTML)</label>
          <textarea name="content" defaultValue={post.content} rows={10} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 font-mono text-sm" />
          <p className="text-xs text-gray-500 mt-1">Tip: Upload an image above to automatically insert it into the content</p>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Tags (comma-separated)</label>
          <input type="text" name="tags" defaultValue={post.tags?.join(', ')} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Published At (ISO datetime)</label>
          <input type="datetime-local" name="publishedAt" defaultValue={post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : ''} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300" />
        </div>
        <div className="flex gap-4 pt-4">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
          >
            {post.id ? 'Update' : 'Create'}
          </motion.button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Cancel
          </motion.button>
        </div>
      </form>
    );
  };

  return (
    <>
      <Helmet>
        <title>Manage Blog Posts — Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 particle-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: -20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Manage Blog Posts</h1>
              <p className="text-gray-600">Create and manage your blog content</p>
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreating(true)}
                className="px-6 py-3 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                + New Post
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin/dashboard"
                  className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  <span>←</span> Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="inline-block text-6xl mb-4"
              >
                ⚡
              </motion.div>
              <p className="text-gray-600 text-xl">Loading blog posts...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Slug</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Published</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {posts.map((post, index) => (
                      <motion.tr
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-sm">{post.slug}</td>
                        <td className="px-6 py-4">
                          {post.publishedAt ? (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setEditingPost(post)}
                              className="px-4 py-2 bg-gradient-to-r from-accent to-cyan-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Edit
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(post.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Delete
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Create/Edit Modal */}
          {(editingPost || isCreating) && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-start justify-center p-4 overflow-y-auto"
              style={{ 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                zIndex: 9999,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
              onClick={() => {
                setEditingPost(null);
                setIsCreating(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl relative flex flex-col"
                style={{ maxHeight: 'calc(100vh - 4rem)', minHeight: 'min-content' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
                <div className="bg-white rounded-t-2xl px-8 pt-8 pb-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-3xl font-bold gradient-text">{isCreating ? 'Create Blog Post' : 'Edit Blog Post'}</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setEditingPost(null);
                      setIsCreating(false);
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                <div className="px-8 pb-8 pt-4 overflow-y-auto flex-1">
                  <PostForm
                    post={editingPost || {}}
                    onClose={() => {
                      setEditingPost(null);
                      setIsCreating(false);
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          , document.body)}
        </div>
      </div>
    </>
  );
}

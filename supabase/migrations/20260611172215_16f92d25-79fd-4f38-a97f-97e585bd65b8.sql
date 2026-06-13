
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
-- storage.objects policies for food-images bucket
CREATE POLICY "food_images_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'food-images');
CREATE POLICY "food_images_auth_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'food-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "food_images_auth_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'food-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "food_images_auth_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'food-images' AND (storage.foldername(name))[1] = auth.uid()::text);

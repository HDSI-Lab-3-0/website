import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

function getAllImageFiles(dir: string, baseDir = dir): string[] {
  const images: string[] = [];
  
  if (!fs.existsSync(dir)) return images;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      images.push(...getAllImageFiles(fullPath, baseDir));
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (IMAGE_EXTENSIONS.includes(ext)) {
        images.push(fullPath);
      }
    }
  }
  
  return images;
}

async function convertToWebp(inputPath: string): Promise<string> {
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const basename = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${basename}.webp`);
  
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath);
  
  return outputPath;
}

function updateFileReferences(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let updated = false;
  
  for (const ext of IMAGE_EXTENSIONS) {
    const regex = new RegExp(`\\${ext}`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, '.webp');
      updated = true;
    }
  }
  
  if (updated) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  Updated references in ${path.relative(rootDir, filePath)}`);
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script\n');
  
  // Step 1: Find and convert all images
  console.log('Step 1: Converting images to WebP...\n');
  
  const srcAssetsDir = path.join(rootDir, 'src', 'assets');
  const publicImagesDir = path.join(rootDir, 'public', 'images');
  
  const allImages = [...getAllImageFiles(srcAssetsDir), ...getAllImageFiles(publicImagesDir)];
  
  console.log(`Found ${allImages.length} images to convert:\n`);
  
  const convertedFiles: string[] = [];
  const originalFiles: string[] = [];
  
  for (const imagePath of allImages) {
    const ext = path.extname(imagePath);
    console.log(`  Converting: ${path.relative(rootDir, imagePath)}`);
    
    try {
      await convertToWebp(imagePath);
      convertedFiles.push(imagePath.replace(ext, '.webp'));
      originalFiles.push(imagePath);
      console.log(`    → Created ${path.basename(imagePath).replace(ext, '.webp')}`);
    } catch (err) {
      console.error(`    ERROR: ${err}`);
    }
  }
  
  console.log(`\n✓ Converted ${convertedFiles.length} images\n`);
  
  // Step 2: Delete original files
  console.log('Step 2: Removing original files...\n');
  
  for (const file of originalFiles) {
    fs.unlinkSync(file);
    console.log(`  Deleted: ${path.relative(rootDir, file)}`);
  }
  
  console.log(`\n✓ Removed ${originalFiles.length} original files\n`);
  
  // Step 3: Update file references
  console.log('Step 3: Updating file references...\n');
  
  const filesToUpdate = [
    path.join(rootDir, 'src', 'data', 'members.json'),
    path.join(rootDir, 'src', 'pages', 'index.astro'),
    path.join(rootDir, 'src', 'components', 'layout', 'BaseHead.astro'),
    path.join(rootDir, 'src', 'components', 'projects', 'ProjectGrid.tsx'),
    path.join(rootDir, 'src', 'components', 'projects', 'ProjectModal.tsx'),
    path.join(rootDir, 'src', 'components', 'events', 'EventGrid.tsx'),
    path.join(rootDir, 'src', 'content', 'events', 'robot-terry-bear-army-parade.mdx'),
    path.join(rootDir, 'src', 'content', 'events', 'robot-teddy-bear-scavenger-hunt.mdx'),
    path.join(rootDir, 'src', 'content', 'events', 'parent-child-robotic-arts-crafts.mdx'),
    path.join(rootDir, 'src', 'content', 'projects', 'robot-flower.md'),
  ];
  
  for (const file of filesToUpdate) {
    if (fs.existsSync(file)) {
      updateFileReferences(file);
    }
  }
  
  console.log('\n✅ Image optimization complete!');
  console.log('\nNext steps:');
  console.log('  1. Run `bunx tsc --noemit` to verify TypeScript');
  console.log('  2. Run `bun run build` to verify the build');
}

main().catch(console.error);

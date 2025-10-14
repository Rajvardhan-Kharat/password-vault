import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import VaultItem from '@/lib/models/VaultItem';
import { encrypt, decrypt } from '@/lib/encryption';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'default-secret';

async function getUserId(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) {
    throw new Error('No token found');
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
  return decoded.userId;
}

export async function GET(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    await connectDB();

    const items = await VaultItem.find({ userId }).sort({ createdAt: -1 });
    
    // Decrypt the data for display
    const decryptedItems = items.map(item => ({
      _id: item._id,
      title: decrypt(item.title),
      username: decrypt(item.username),
      password: decrypt(item.password),
      url: item.url ? decrypt(item.url) : '',
      notes: item.notes ? decrypt(item.notes) : '',
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json(decryptedItems);
  } catch (error) {
    console.error('Get vault items error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserId(request);
    const { title, username, password, url, notes } = await request.json();

    if (!title || !username || !password) {
      return NextResponse.json(
        { error: 'Title, username, and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const vaultItem = new VaultItem({
      userId,
      title: encrypt(title),
      username: encrypt(username),
      password: encrypt(password),
      url: url ? encrypt(url) : '',
      notes: notes ? encrypt(notes) : '',
    });

    await vaultItem.save();

    return NextResponse.json(
      { message: 'Vault item created successfully', id: vaultItem._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create vault item error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}

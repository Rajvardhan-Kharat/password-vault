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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId(request);
    const { id } = await params;
    const { title, username, password, url, notes } = await request.json();

    if (!title || !username || !password) {
      return NextResponse.json(
        { error: 'Title, username, and password are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const vaultItem = await VaultItem.findOne({ _id: id, userId });
    if (!vaultItem) {
      return NextResponse.json(
        { error: 'Vault item not found' },
        { status: 404 }
      );
    }

    vaultItem.title = encrypt(title);
    vaultItem.username = encrypt(username);
    vaultItem.password = encrypt(password);
    vaultItem.url = url ? encrypt(url) : '';
    vaultItem.notes = notes ? encrypt(notes) : '';

    await vaultItem.save();

    return NextResponse.json(
      { message: 'Vault item updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update vault item error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId(request);
    const { id } = await params;
    await connectDB();

    const vaultItem = await VaultItem.findOne({ _id: id, userId });
    if (!vaultItem) {
      return NextResponse.json(
        { error: 'Vault item not found' },
        { status: 404 }
      );
    }

    await VaultItem.deleteOne({ _id: id, userId });

    return NextResponse.json(
      { message: 'Vault item deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete vault item error:', error);
    return NextResponse.json(
      { error: 'Unauthorized or server error' },
      { status: 401 }
    );
  }
}

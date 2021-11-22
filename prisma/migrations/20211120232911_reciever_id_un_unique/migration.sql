-- DropIndex
DROP INDEX "Message_recieverId_key";

-- RenameIndex
ALTER INDEX "Contact_email_key" RENAME TO "Contact.email_unique";
